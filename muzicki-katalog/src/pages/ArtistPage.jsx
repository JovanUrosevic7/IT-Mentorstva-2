import { Link, useParams } from "react-router-dom"
import albumsData from "../data/albums.json"
import AlbumList from "../components/AlbumList"


function ArtistPage() {

    const { name } = useParams()
    const decodedName = decodeURIComponent(name)

    const artistAlbums = albumsData.filter(album => album.izvodjac.toLowerCase() === decodedName.toLowerCase())

    const sortedAlbums = [...artistAlbums].sort((a, b) => a.godina - b.godina)


    return (
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">

            {/* Navigacija / Nazad link */}
            <div>
                <Link
                    to="/"
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                    ← Nazad na početnu
                </Link>
            </div>

            {/* Zaglavlje izvođača */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                        🎤 {decodedName}
                    </h1>
                    <p className="text-sm text-slate-500 font-medium">
                        Svi albumi izvođača poređani po godini izdanja
                    </p>
                </div>

                {/* Bedž sa ukupnim brojem albuma */}
                <div className="bg-slate-100 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 border border-slate-200/60">
                    Ukupno albuma: <span className="text-slate-900 font-bold">{sortedAlbums.length}</span>
                </div>
            </div>

            {/* Sekcija sa albumima */}
            <div className="flex flex-col gap-4 mt-2">
                <h2 className="text-lg font-bold text-slate-800 px-1">Diskografija</h2>

                {sortedAlbums.length > 0 ? (
                    <div className="w-full">
                        <AlbumList albums={sortedAlbums} />
                    </div>
                ) : (
                    <div className="w-full border border-dashed border-slate-200 py-12 rounded-2xl text-center text-slate-400 text-sm bg-white">
                        Nema pronađenih albuma za ovog izvođača.
                    </div>
                )}
            </div>

        </div>
    )
}

export default ArtistPage