import axios from "axios"
import { useState } from "react"
import Movie from "./Components/Movie"
import Navigation from "./Templates/Snippets/Navigation"
import Footer from "./Templates/Snippets/Footer"
import Search from "./Templates/Snippets/Search"
import SearchResults from "./Templates/SearchResults"


const API_KEY = "450e8dbe"
// https://www.omdbapi.com/?i=tt3896198&apikey=450e8dbe

let movieData = await axios.get(`${import.meta.env.VITE_OMDBAPI_URL}?i=tt3896198&apikey=${import.meta.env.VITE_OMDBAPI_KEY}`)
  .then(response => {return response.data})
  .catch(err => console.log(err))

function App() {
  
  


  
  
  return (
    <div>

      <Navigation />

      <Search />

      <SearchResults />

      {/* <Movie /> */}

      <Footer />
      
    </div>
  )
}

export default App