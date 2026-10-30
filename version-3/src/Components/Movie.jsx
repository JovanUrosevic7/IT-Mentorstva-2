import axios from "axios";
import { useState } from "react";
import Navigation from "../Templates/Snippets/Navigation";
import Footer from "../Templates/Snippets/Footer";

function Movie() {


    let [searchedMovie, setSearchedMovie] = useState("")
    let [typeMovie, setTypeMovie] = useState("")


    const searchingMovieByTitle = async () => {
        if (searchedMovie == "") {
            return    
        }

        let movieDataByName = await axios.get(`${import.meta.env.VITE_OMDBAPI_URL}?t=${searchedMovie.toLowerCase()}&apikey=${import.meta.env.VITE_OMDBAPI_KEY}`)
            .then(response => { return response.data })
            .catch(err => console.log(err))

        console.log(movieDataByName);

    }

    const searchingMovieBySearchAndType = async () => {
        if (searchedMovie == "" || typeMovie === "") {
            return    
        }

        console.log(searchedMovie, typeMovie);
        

        let movieDataByName = await axios.get(import.meta.env.VITE_OMDBAPI_URL, {
            params:{
                s: searchedMovie.toLowerCase(),
                type: typeMovie.toLocaleLowerCase(),
                apikey: import.meta.env.VITE_OMDBAPI_KEY
            }
        })

        console.log(movieDataByName.data.Search);

    }


    return (
        <div>

            <form action="">
                <input type="text" name="" id="" className="border" placeholder="Search" onInput={(e) => setSearchedMovie(e.currentTarget.value)} />
                <input type="text" name="" id="" className="border" placeholder="Type" onInput={(e) => setTypeMovie(e.currentTarget.value)} />
                <button type="button" className="border bg-blue-400 px-[10px] py-[5px] rounded-xl ml-[10px]" onClick={searchingMovieBySearchAndType}>Pretrazi</button>
            </form>



        </div>
    )
}

export default Movie