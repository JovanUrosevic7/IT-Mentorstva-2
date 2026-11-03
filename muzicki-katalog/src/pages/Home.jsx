import AlbumList from "../components/AlbumList";
import Search from "../components/Search";
import albumsData from "../data/albums.json"
import { useState } from "react";


function Home() {

  const [albums] = useState(albumsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All")
  
  const genres = ["All", ...new Set(albums.map(album => album.zanr))]

  const filteredAlbums = albums.filter(album => {

    const matchesGenre = selectedGenre === "All" || album.zanr === selectedGenre 

    const query = searchTerm.toLowerCase()
    const matchesSearch =
      album.naziv.toLowerCase().includes(query) ||
      album.izvodjac.toLowerCase().includes(query) 
    
    return matchesGenre && matchesSearch

  })
  
  console.log(genres);

  return (
    <div>
      <p>Home</p>

      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="flex gap-[10px] p-[10px]">
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className="border px-[5px] py-[2px] cursor-pointer"
          >
            {genre}
          </button>
        ))}
      </div>

      <p>Albums:</p>

      <div className="w-full flex justify-center">
        <AlbumList albums={filteredAlbums} />
      </div>

    </div>
  )
}

export default Home