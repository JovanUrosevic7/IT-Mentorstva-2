import { SingleMovieSearch } from "../interfaces/movieStorage/SingleMovieSearch";
import { SingleMovieInterface } from "../interfaces/SingleMovieInterface";

export function remeberMovieSearch(movie: SingleMovieSearch): void{

    const preparedData: string = JSON.stringify(movie)

    localStorage.setItem("rememberMovies", preparedData)

}

export function getAllMovieSearches(){

}