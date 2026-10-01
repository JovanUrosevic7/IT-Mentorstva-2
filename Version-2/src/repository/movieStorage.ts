import { SingleMovieSearch } from "../interfaces/movieStorage/SingleMovieSearch";
import { SingleMovieInterface } from "../interfaces/SingleMovieInterface";

export function remeberMovieSearch(movie: SingleMovieSearch): void{

    const existingMovies = getAllMovieSearches()

    existingMovies.push(movie)

    localStorage.setItem("rememberedMovies", JSON.stringify(existingMovies))

}

export function getAllMovieSearches(): SingleMovieSearch[] {
    const data = localStorage.getItem("rememberedMovies")
    return data ? JSON.parse(data) : []
}