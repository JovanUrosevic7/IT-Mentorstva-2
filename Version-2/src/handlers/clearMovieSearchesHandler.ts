import { clearExistingMovies } from "../repository/movieStorage"


export function clearMovieSearchesHandler(): void {

    const existingMovieDiv = document.querySelector("#searchedMovies") as HTMLDivElement | null

    clearExistingMovies()
    existingMovieDiv.innerHTML = ""

}