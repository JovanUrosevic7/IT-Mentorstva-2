import axios from "axios"
import { useState } from "react"
import Movie from "./Components/Movie"


const API_KEY = "450e8dbe"
// https://www.omdbapi.com/?i=tt3896198&apikey=450e8dbe

let movieData = await axios.get(`${import.meta.env.VITE_OMDBAPI_URL}?i=tt3896198&apikey=${import.meta.env.VITE_OMDBAPI_KEY}`)
  .then(response => {return response.data})
  .catch(err => console.log(err))

function App() {
  
  


  
  
  return (
    <div>

      <Movie />
      
    </div>
  )
}

export default App