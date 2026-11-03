import { Link } from "react-router-dom"

function AlbumCard({album}) {


    return (
        <div >

            <img src={album.omot} alt={album.omot} className="border w-full aspect-square object-cover" />

            <div className="flex flex-col gap-[2px]">
                
                <h1 className="text-2xl [overflow-wrap:anywhere]">{album.naziv}</h1>
                
                <Link to={`/artist/:${encodeURIComponent(album.izvodjac)}`} target="_blank">{album.izvodjac}</Link>
                
                <p>{album.godina} • {album.zanr}</p>

                <Link to={`/album/${album.id}`} target="_blank" className="border bg-violet-400 p-[5px] rounded-lg w-[150px] text-center cursor-pointer">Pogledaj album</Link>
            </div>

        </div>
    )
}

export default AlbumCard