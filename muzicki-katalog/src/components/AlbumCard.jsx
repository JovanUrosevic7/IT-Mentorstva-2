import { Link } from "react-router-dom"

function AlbumCard({ album }) {


    return (
        <div className="w-full bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col h-full group">

            {/* Omot albuma sa efektnim zumiranjem na hover */}
            <div className="relative overflow-hidden aspect-square bg-slate-100">
                <img
                    src={album.omot}
                    alt={album.naziv}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Informacije o albumu */}
            <div className="p-4 flex flex-col flex-grow justify-between gap-3">

                <div className="flex flex-col gap-1">
                    {/* Naziv albuma */}
                    <h3 className="font-bold text-slate-800 text-base line-clamp-1 [overflow-wrap:anywhere]" title={album.naziv}>
                        {album.naziv}
                    </h3>

                    {/* Izvođač (Link ka stranici izvođača) */}
                    <Link
                        to={`/artist/${encodeURIComponent(album.izvodjac)}`}
                        className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline w-fit"
                    >
                        {album.izvodjac}
                    </Link>

                    {/* Godina i žanr */}
                    <p className="text-xs text-slate-400 mt-0.5">
                        {album.godina} • <span className="capitalize">{album.zanr}</span>
                    </p>
                </div>

                {/* Dugme za detalje */}
                <Link
                    to={`/album/${album.id}`}
                    className="w-full mt-2 bg-violet-600 hover:bg-violet-700 text-white font-medium text-xs py-2 px-3 rounded-xl text-center transition-colors cursor-pointer shadow-xs"
                >
                    Pogledaj album
                </Link>
            </div>

        </div>
    )
}

export default AlbumCard