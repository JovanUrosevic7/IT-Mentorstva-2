import { SingleMovieInterface } from "../interfaces/SingleMovieInterface"

export function getMovieDatas(movies: SingleMovieInterface, htmlMovieList: HTMLDivElement){

    movies.forEach((movie: {Title: string, Poster: string}) => {        

        let movieTitle = document.createElement("h3") as HTMLHeadElement
        let moviePoster = document.createElement("img") as HTMLImageElement
        let movieHolder = document.createElement("div") as HTMLDivElement

        movieTitle.textContent = <string> movie.Title
        moviePoster.src = <string> movie.Poster

        movieHolder.append(movieTitle, moviePoster)

        htmlMovieList.append(movieHolder)

        console.log(movie);


    })

    

}