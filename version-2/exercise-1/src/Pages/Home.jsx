import { useSearchParams } from "react-router-dom"
import AllVideos from "../Components/AllVideos"
import SearchBar from "../Components/SearchBar"
import { useState } from "react"
import VIDEOS from "../videos.json"

function Home() {

    let [videos, setVideos] = useState(VIDEOS)
    let [filteredVideos, setFilteredVideos] = useState(VIDEOS)

    const handleSearchedVideo = (result) => {
        setFilteredVideos(result)
    }

    console.log(filteredVideos);
    

    return (
        <div>

            <h1>Glavna stranica</h1>

            <SearchBar videos={videos} onSearchVideo={handleSearchedVideo} />

            <AllVideos filteredVideos={filteredVideos}/>   


        </div>
    )
}

export default Home

