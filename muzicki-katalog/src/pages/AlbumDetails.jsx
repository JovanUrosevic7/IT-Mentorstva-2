import { Link, useParams } from "react-router-dom"
import albumsData from "../data/albums.json"


function AlbumDetails() {

    const { id } = useParams()
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



    return (
        <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">

            {/* Navigacija / Nazad link */}
            <div>
                <Link
                    to="/"
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                    ← Nazad na početnu
                </Link>
            </div>

            {/* Glavni box sa informacijama o albumu */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xs flex flex-col md:flex-row gap-8 items-center md:items-start">

                {/* Omot albuma */}
                <img
                    src={album.omot}
                    alt={album.naziv}
                    className="w-64 h-64 md:w-72 md:h-72 object-cover rounded-xl shadow-md border border-slate-100 flex-shrink-0"
                />

                {/* Tekstualni podaci */}
                <div className="flex flex-col justify-between flex-grow w-full gap-4 text-center md:text-left">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 [overflow-wrap:anywhere]">
                            {album.naziv}
                        </h1>

                        <p className="text-lg text-slate-600 font-medium">
                            Izvođač: <span className="text-slate-800 font-bold">{album.izvodjac}</span>
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs font-semibold text-slate-500 mt-1">
                            <span className="bg-slate-100 px-3 py-1 rounded-full">Godina: {album.godina}</span>
                            <span className="bg-slate-100 px-3 py-1 rounded-full uppercase">Žanr: {album.zanr}</span>
                        </div>
                    </div>

                    {/* Ukupno trajanje */}
                    <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 flex items-center justify-between mt-2">
                        <span className="text-xs font-medium text-blue-700">Ukupno trajanje albuma</span>
                        <span className="text-sm font-bold text-blue-900">{calculateTotalDuration(album.pesme)}</span>
                    </div>
                </div>
            </div>

            {/* Sekcija sa pesmama */}
            <div className="flex flex-col gap-3 mt-4">
                <h3 className="text-lg font-bold text-slate-800 px-1">Lista pesama</h3>

                <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs divide-y divide-slate-100">
                    {album.pesme.map((pesma, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50/80 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-slate-400 w-5">{index + 1}.</span>
                                <span className="text-sm font-medium text-slate-700">{pesma.naziv}</span>
                            </div>
                            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                                {pesma.trajanje}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default AlbumDetails