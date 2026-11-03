import { Link, useParams } from "react-router-dom"
import albumsData from "../data/albums.json"
import AlbumList from "../components/AlbumList"


function ArtistPage() {

    const {name} = useParams()
    const decodeName = decodeURIComponent(name)

    const artistAlbums = albumsData.filter(album => album.izvodjac.toLowerCase() === decodeName.toLowerCase())

    const sortedAlbums = [...artistAlbums].sort((a,b) => a.godina - b.godina)

    console.log(albumsData);
    console.log(decodeName);
    

    return (
        <div style={{ padding: '20px' }}>
            <h1>Stranica izvođača: {name}</h1>
            <Link to="/">← Nazad na početnu</Link>


            <div>
                <AlbumList albums={sortedAlbums} />
            </div>

        </div>
    )
}

export default ArtistPage