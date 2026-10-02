import { ApiSuccessInterface } from "../interfaces/ApiSuccessInterface"
import { SingleMovieSearch } from "../interfaces/movieStorage/SingleMovieSearch"
import { getAllMovieSearches } from "../repository/movieStorage"
import { callOmdbApi } from "../services/omdbApiServices"
import { getMovieDatas } from "./listMovieResults"



export function renderPreviousSearches(): void {

    const existingMovieDiv = document.querySelector("#searchedMovies") as HTMLDivElement | null
    const movieList = document.querySelector("#movieList") as HTMLDivElement | null


    const existingMovies: SingleMovieSearch[] = getAllMovieSearches()
    
    existingMovies.forEach((movie: SingleMovieSearch) => {

        const existingMovieHolder = document.createElement("div") as HTMLDivElement
        const existingMovieParagraph = document.createElement("p") as HTMLParagraphElement

        existingMovieParagraph.textContent = `${movie.name} - ${movie.year}`
    
        existingMovieHolder.append(existingMovieParagraph)
    
        existingMovieDiv.append(existingMovieHolder)
        

        existingMovieHolder.addEventListener("click", async () => {

            let response = await callOmdbApi([
                { key: "s", value: movie.name },
                { key: "y", value: movie.year }
            ]);

            const successData = response.data as ApiSuccessInterface
            getMovieDatas(successData.Search, movieList) 
            

        })

    })


}