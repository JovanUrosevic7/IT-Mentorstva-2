"use client"


import { useState, useEffect } from 'react';
import { fetchLinks, deleteLink } from '../../services/linkService';
import Link from 'next/link';


export default function LinksPage() {

    const [links, setLinks] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")


    const loadLinks = async (query = "") => {

        try {

            setLoading(true)
            const data = await fetchLinks(query)
            setLinks(data)
            setError("")

        } catch (error) {
            setError('Greška prilikom učitavanja linkova.');
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        loadLinks()
    }, [])

    useEffect(() => {

        const timer = setTimeout(() => {
            loadLinks(searchQuery)
        }, 400)

        return () => clearTimeout(timer)
    }, [searchQuery])


    const handleDelete = async (code) => {

        if (!confirm('Da li si siguran da želiš da obrišeš ovaj link?')) return

        try {

            await deleteLink(code)
            setLinks(links.filter(l => l.code !== code))

        } catch (error) {
            alert("Greska prilikom brisanja linkova")
        }

    }



    return (
        <main style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', fontFamily: 'sans-serif' }}>
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1>📋 Lista Svih Linkova</h1>
                <Link href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
                    &larr; Nazad na početnu
                </Link>
            </nav>

            {/* Polje za pretragu */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Pretraži po originalnom URL-u ili kodu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
                />
            </div>

            {/* Prikaz greške ili učitavanja */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading && <p style={{ color: '#666' }}>Učitavanje...</p>}

            {/* Tabela sa linkovima */}
            {!loading && links.length === 0 ? (
                <p style={{ color: '#777', textAlign: 'center', marginTop: '40px' }}>Nema sačuvanih linkova.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', border: '1px solid #ddd', borderRadius: '4px' }}>
                    <thead>
                        <tr style={{ background: '#f4f4f4', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                            <th style={{ padding: '12px' }}>Kratak kod / Link</th>
                            <th style={{ padding: '12px' }}>Originalni URL</th>
                            <th style={{ padding: '12px', textAlign: 'center' }}>Klikovi</th>
                            <th style={{ padding: '12px', textAlign: 'center' }}>Akcija</th>
                        </tr>
                    </thead>
                    <tbody>
                        {links.map((link) => {
                            const fullShortUrl = typeof window !== 'undefined' ? `${window.location.origin}/${link.code}` : `/${link.code}`;
                            const isExpired = link.expiresAt && new Date() > new Date(link.expiresAt);

                            return (
                                <tr key={link.code} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px' }}>
                                        <a href={`/${link.code}`} target="_blank" style={{ color: '#0070f3', fontWeight: 'bold', textDecoration: 'none' }}>
                                            {link.code}
                                        </a>
                                    </td>
                                    <td style={{ padding: '12px', maxWidth: '300px', wordBreak: 'break-all' }}>
                                        <a href={link.originalUrl} target="_blank" style={{ color: '#333', textDecoration: 'none' }}>
                                            {link.originalUrl}
                                        </a>
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>
                                        {link.clicks}
                                    </td>

                                    {/* 🕒 NOVO: Kolona za datum isteka */}
                                    <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px' }}>
                                        {link.expiresAt ? (
                                            <span style={{ color: isExpired ? '#d32f2f' : '#2e7d32', fontWeight: 'bold' }}>
                                                {new Date(link.expiresAt).toLocaleDateString()}
                                                {isExpired && <div style={{ fontSize: '11px', color: '#d32f2f' }}>(Istekao)</div>}
                                            </span>
                                        ) : (
                                            <span style={{ color: '#888' }}>Neograničeno</span>
                                        )}
                                    </td>

                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                        <button
                                            onClick={() => handleDelete(link.code)}
                                            style={{ padding: '6px 12px', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                        >
                                            Obriši
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </main>
    );



}
