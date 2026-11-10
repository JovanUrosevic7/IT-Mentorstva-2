"use client"

import { useState } from 'react';
import { createLink } from '../services/linkService';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

export default function Home() {

  const [originalUrl, setOriginalUrl] = useState("")
  const [customCode, setCustomCode] = useState("")
  const [shortLink, setShortLink] = useState(null)
  const [expiresAt, setExpiresAt] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {

    e.preventDefault()
    setError("")
    setShortLink(null)
    setLoading(true)

    try{

      const data = await createLink(originalUrl, customCode, expiresAt)

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin 
      setShortLink(`${baseUrl}/${data.code}`)

      setOriginalUrl("")
      setCustomCode("")

    } catch (error){
      setError(error.message || "Doslo je do greske. ")
    } finally{
      setLoading(false)
    }

  }

  const handleCopy = () => {

    navigator.clipboard.writeText(shortLink)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000);

  }


  return (
        <main style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', fontFamily: 'sans-serif' }}>
            <nav style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                <h1>🔗 Mini Skraćivač Linkova</h1>
                <Link href="/links" style={{ color: 'blue', textDecoration: 'underline' }}>
                    Pogledaj sve linkove &rarr;
                </Link>
            </nav>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Dugačak URL:</label>
                    <input 
                        type="text" 
                        placeholder="https://example.com/dugacka-putanja" 
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Opcioni custom kod (3-20 karaktera):</label>
                    <input 
                        type="text" 
                        placeholder="npr. moj-link" 
                        value={customCode}
                        onChange={(e) => setCustomCode(e.target.value)}
                        style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                <div >
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Datum isteka (opciono):</label>
                    <input 
                        type="date" 
                        value={expiresAt}
                        onChange={(e) => setExpiresAt(e.target.value)}
                        style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                        className='border border-gray-300'
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ padding: '12px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                    {loading ? 'Skraćivanje...' : 'Skrati link'}
                </button>
            </form>

            {/* Prikaz greške ako postoji */}
            {error && (
                <div style={{ marginTop: '20px', padding: '10px', background: '#ffebee', color: '#c62828', borderRadius: '4px', border: '1px solid #ef9a9a' }}>
                    {error}
                </div>
            )}

            {/* Prikaz uspešno kreiranog kratkog linka */}
            {shortLink && (
                <div style={{ marginTop: '20px', padding: '15px', background: '#e8f5e9', color: '#2e7d32', borderRadius: '4px', border: '1px solid #a5d6a7' }}>
                    <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Uspešno skraćeno!</p>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input 
                            type="text" 
                            value={shortLink} 
                            readOnly 
                            style={{ flex: 1, padding: '8px', background: 'white', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                        <button 
                            onClick={handleCopy}
                            style={{ padding: '8px 15px', background: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            {copied ? 'Kopirano!' : 'Kopiraj'}
                        </button>
                    </div>

                    <div className='w-full flex justify-center items-center mt-[20px]'>
                        <div style={{ textAlign: 'center', background: "white" , padding: '10px', display: 'inline-block', borderRadius: '4px' }} className=''>
                            <QRCodeSVG value={shortLink} size={128} />
                            <p style={{ fontSize: '12px', margin: '5px 0 0 0', color: '#666' }}>Skeniraj QR kod</p>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

