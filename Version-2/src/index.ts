import { generateYears } from "./helpers/generateYears";
import { buildUrl, callOmdbApi } from "./services/omdbApiServices";


const titleInput = document.querySelector("#titleInput") as HTMLInputElement | null
const ageSelect = document.querySelector("#ageSelect") as HTMLSelectElement | null
const searchBtn = document.querySelector("#searchBtn") as HTMLButtonElement | null


generateYears(1960, ageSelect, 2025)

async function searchMovie(name: string, age: string){

    // console.log(name, age);
    

    const response = await callOmdbApi([
        {
            key: "s",
            value: name
        },
        {
            key: "y",
            value: age
        }
    ])

    console.log(response);
    


}

searchBtn?.addEventListener("click",() => {
    const movieName = titleInput?.value ?? ""
    const movieYear = ageSelect?.value ?? ""

    searchMovie(movieName, movieYear)
})