import axios from "axios";
import { useState } from "react";

function Movie() {


    let [searchedMovie, setSearchedMovie] = useState("")


    const searchingMovie = async () => {
        if (searchedMovie == "") {
            return    
        }

        let movieDataByName = await axios.get(`${import.meta.env.VITE_OMDBAPI_URL}?t=${searchedMovie.toLowerCase()}&apikey=${import.meta.env.VITE_OMDBAPI_KEY}`)
            .then(response => { return response.data })
            .catch(err => console.log(err))

        console.log(movieDataByName);

    }


    return (
        <div>

            <form action="">
                <input type="text" name="" id="" className="border" onInput={(e) => setSearchedMovie(e.currentTarget.value)} />
                <button type="button" className="border bg-blue-400 px-[10px] py-[5px] rounded-xl ml-[10px]" onClick={searchingMovie}>Pretrazi</button>
            </form>

        </div>
    )
}

export default Movie