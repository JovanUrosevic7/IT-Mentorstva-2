import AlbumList from "../components/AlbumList";
import Search from "../components/Search";
import albumsData from "../data/albums.json"
import { useState } from "react";


function Home() {

  const [albums] = useState(albumsData)
  const [searchTerm, setSearchTerm] = useState("")
  
  const filteredAlbums = albums.filter(album => {
    const query = searchTerm.toLowerCase()
    
    return(
      album.naziv.toLowerCase().includes(query) ||
      album.izvodjac.toLowerCase().includes(query) 
    )
  })
  
  console.log(albums);
  console.log(filteredAlbums);

  return (
    <div>
      <p>Home</p>

      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <p>Albums:</p>

      <div className="w-full flex justify-center">
        <AlbumList albums={filteredAlbums} />
      </div>

    </div>
  )
}

export default Home