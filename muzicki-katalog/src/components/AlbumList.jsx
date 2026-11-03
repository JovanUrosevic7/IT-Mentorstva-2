import AlbumCard from "./AlbumCard"

function AlbumList({ albums }) {

    if (albums.length === 0) {
        return <p style={{ textAlign: 'center', color: '#777' }}>Nema pronađenih albuma.</p>;
    }


    return (
        <div className="grid grid-cols-5 gap-4">
            {albums.map(album => (
                <div key={album.id} className="w-[300px]">
                    <AlbumCard album={album} />
                </div>
            ))}
        </div>
    )
}

export default AlbumList

