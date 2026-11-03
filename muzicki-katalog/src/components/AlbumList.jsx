import AlbumCard from "./AlbumCard"

function AlbumList({ albums, favorites, onToggleFavorite }) {

    if (albums.length === 0) {
        return <p style={{ textAlign: 'center', color: '#777' }}>Nema pronađenih albuma.</p>;
    }


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
            {albums.map(album => (
                <div key={album.id} className="w-full flex justify-center">
                    <AlbumCard album={album} isFavorite={favorites.includes(album.id)} onToggleFavorite={onToggleFavorite}/>
                </div>
            ))}
        </div>
    )
}

export default AlbumList

