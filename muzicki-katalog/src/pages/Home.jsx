import AlbumList from "../components/AlbumList";
import Search from "../components/Search";
import albumsData from "../data/albums.json"
import { useState } from "react";


function Home() {

  const [albums] = useState(albumsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [sortBy, setSortBy] = useState("default")

  const genres = ["All", ...new Set(albums.map(album => album.zanr))]

  const filteredAlbums = albums.filter(album => {

    const matchesGenre = selectedGenre === "All" || album.zanr === selectedGenre

    const query = searchTerm.toLowerCase()
    const matchesSearch =
      album.naziv.toLowerCase().includes(query) ||
      album.izvodjac.toLowerCase().includes(query)

    return matchesGenre && matchesSearch

  })

  const sortedAndFilteredAlbums = [...filteredAlbums].sort((a,b) => {
    if(sortBy === "year-desc"){
      return b.godina - a.godina
    }

    if(sortBy === "year-asc"){
      return a.godina - b.godina
    }
    
    if(sortBy === "name-asc"){
      return a.naziv - b.naziv
    }
    
    if(sortBy === "year-desc"){
      return b.naziv - a.naziv
    }

    return 0
  })


  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">

      {/* Zaglavlje / Naslov */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">🎵 Početna</h1>
      </div>

      {/* Sekcija za pretragu */}
      <div className="w-full">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="flex items-center justify-between">

        {/* Filteri po žanru */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Žanrovi:</span>
          <div className="flex flex-wrap gap-2.5">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${selectedGenre === genre
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Sortiranje po godini ili nazivu */}
        <div className="flex items-center gap-[5px]">
          <p>Sortiraj: </p>
          <select className="border cursor-pointer w-[150px]" onChange={(e) => setSortBy(e.currentTarget.value)}>
            <option value="default">Podrazumevano</option>
            <option value="year-desc">Godina: Od najnovijeg</option>
            <option value="year-asc">Godina: Od najstarijeg</option>
            <option value="name-asc">Naziv: A - Z</option>
            <option value="name-desc">Naziv: Z - A</option>
          </select>
        </div>

      </div>


      {/* Naslov za albume */}
      <div className="flex items-center justify-between pt-2">
        <h2 className="text-lg font-bold text-slate-800">Katalog albuma:</h2>
        <span className="text-xs font-medium text-slate-400">Ukupno: {sortedAndFilteredAlbums.length}</span>
      </div>

      {/* Lista albuma */}
      <div className="w-full">
        <AlbumList albums={sortedAndFilteredAlbums} />
      </div>

    </div>
  )
}

export default Home