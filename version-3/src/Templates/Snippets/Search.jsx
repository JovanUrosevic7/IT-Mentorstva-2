import axios from "axios"
import { useState } from "react"
import SearchResults from "../SearchResults"

function Search() {

    const [searchedMovie, setSearchedMovie] = useState("")
    const [movies, setMovies] = useState({})


    const searchingMovie = async () => {
        if (searchedMovie == "") {
            return
        }

        let movieDataByName = await axios.get(`${import.meta.env.VITE_OMDBAPI_URL}?s=${searchedMovie.toLowerCase()}&apikey=${import.meta.env.VITE_OMDBAPI_KEY}`)
            .then(response => { return response.data })
            .catch(err => console.log(err))

        setMovies(movieDataByName.Search)



    }

    console.log(movies);
    

    return (

        <>

            <div className="w-full flex justify-center py-[20px] bg-gray-900">

                <div className="mb-3 xl:w-96 ">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <input
                            type="search"
                            className="relative m-0 block flex-auto  border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-white text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                            aria-label="Search"
                            aria-describedby="button-addon2"
                            placeholder="Search movie"
                            onInput={(e) => setSearchedMovie(e.currentTarget.value)}

                        />

                        {/* <!--Search icon--> */}
                        <span
                            className="input-group-text flex items-center justify-center whitespace-nowrap w-[60px] px-3 py-1.5 text-center text-base font-normal text-white bg-blue-700 dark:text-neutral-200"
                            id="basic-addon2"
                            onClick={searchingMovie}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5">
                                <path
                                    fillRule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clipRule="evenodd" />
                            </svg>
                        </span>
                    </div>
                </div>



            </div>

            <SearchResults movies={movies} />
        </>

    )
}

export default Search