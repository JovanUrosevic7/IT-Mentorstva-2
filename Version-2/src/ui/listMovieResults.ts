import { SingleMovieInterface } from "../interfaces/SingleMovieInterface"
import { showMovieDetails } from "./showMovieDetails"


export function getMovieDatas(movies: SingleMovieInterface[], htmlMovieList: HTMLDivElement): void{

    htmlMovieList.innerHTML = ""

    movies.forEach(movie => {        

        let movieTitle = document.createElement("h3") as HTMLHeadElement
        let moviePoster = document.createElement("img") as HTMLImageElement
        let movieHolder = document.createElement("div") as HTMLDivElement
        let viewMovieDetails = document.createElement("button") as HTMLButtonElement

        movieTitle.textContent = <string> movie.Title
        moviePoster.src = <string> movie.Poster
        viewMovieDetails.textContent = "Details"

        viewMovieDetails.setAttribute("show-imdb-id", <string> movie.imdbID)
        viewMovieDetails.addEventListener("click", async () => {
            showMovieDetails(<string> movie.imdbID)
            
        })
        
        movieHolder.append(movieTitle, moviePoster, viewMovieDetails)

        htmlMovieList.append(movieHolder)

        console.log(movie);




    })

    

}