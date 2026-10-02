import { clearMovieSearchesHandler } from "../handlers/clearMovieSearchesHandler"
import { searchMovieHandler } from "../handlers/searchMovieHandler"

export function blindSearchEvent(): void{

    const searchBtn = document.querySelector("#searchBtn") as HTMLButtonElement | null
    const clearSearchesBtn = document.querySelector("#clearSearchesBtn") as HTMLButtonElement | null

    searchBtn?.addEventListener("click", searchMovieHandler)
    clearSearchesBtn?.addEventListener("click", clearMovieSearchesHandler)

}