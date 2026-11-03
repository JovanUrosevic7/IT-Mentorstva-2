import { Link, useParams } from "react-router-dom"
import albumsData from "../data/albums.json"
import { useState } from "react"


function AlbumDetails() {

    const {id} = useParams()
    let album = albumsData.find(album => album.id === id)    

    if (!album) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
                <h2>❌ Album ne postoji</h2>
                <p>Žao nam je, album sa ovim ID-jem nije pronađen.</p>
                <Link to="/" style={{ color: '#0070f3', textDecoration: 'underline' }}>
                    ← Nazad na početnu stranicu
                </Link>
            </div>
        );
    }

    const calculateTotalDuration = (pesme) => {

        let totalSeconds = 0

        pesme.forEach(pesma => {
            const [minutes, seconds] = pesma.trajanje.split(":").map(Number)

            totalSeconds += minutes * 60 + seconds
        })

        const totalMinutes = Math.floor(totalSeconds / 60)
        const remainingSeconds = totalSeconds % 60

        return `${totalMinutes}:${totalSeconds < 10 ? "0" : ""}${remainingSeconds}`

    }

    console.log(album);
    

    return (
        <div>
            <h1>
                AlbumDetails
            </h1>


            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', background: '#f9f9f9', padding: '20px', borderRadius: '10px', border: '1px solid #ddd' }}>
                <img 
                    src={album.omot} 
                    alt={album.naziv} 
                    style={{ width: '250px', height: '250px', objectFit: 'cover', borderRadius: '8px' }} 
                />
                
                <div style={{ flex: 1 }}>
                    <h1 style={{ margin: '0 0 10px 0' }}>{album.naziv}</h1>
                    <p style={{ fontSize: '18px', color: '#555', margin: '0 0 5px 0' }}>
                        Izvođač: <strong>{album.izvodjac}</strong>
                    </p>
                    <p style={{ color: '#777', margin: '0 0 5px 0' }}>Godina izdanja: {album.godina}</p>
                    <p style={{ color: '#777', margin: '0 0 15px 0' }}>Žanr: {album.zanr}</p>
                    
                    <p style={{ fontWeight: 'bold', color: '#333' }}>
                        Ukupno trajanje albuma: <span style={{ color: '#0070f3' }}>{calculateTotalDuration(album.pesme)}</span>
                    </p>
                </div>
            </div>

            <h3 style={{ marginTop: '30px' }}>Lista pesama:</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {album.pesme.map((pesma, index) => (
                    <li 
                        key={index} 
                        style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 15px', borderBottom: '1px solid #eee', background: '#fff', marginBottom: '5px', borderRadius: '4px' }}
                    >
                        <span>{index + 1}. {pesma.naziv}</span>
                        <span style={{ color: '#666' }}>{pesma.trajanje}</span>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default AlbumDetails