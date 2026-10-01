import { generateYears } from "./helpers/generateYears";
import { getMovieDatas } from "./helpers/takingMovieDatas";
import { buildUrl, callOmdbApi } from "./services/omdbApiServices";


const titleInput = document.querySelector("#titleInput") as HTMLInputElement | null
const ageSelect = document.querySelector("#ageSelect") as HTMLSelectElement | null
const searchBtn = document.querySelector("#searchBtn") as HTMLButtonElement | null
const movieList = document.querySelector("#movieList") as HTMLDivElement | null


if (ageSelect) {
    generateYears(1960, ageSelect, 2025);
}

async function searchMovie(name: string, age: string){

    // console.log(name, age);

    if(movieList) {
        movieList.innerHTML = ""
    }
    
    if (!name.trim()) {
        alert("Molimo unesite naziv filma.");
        return;
    }

    let response = await callOmdbApi([
        {
            key: "s",
            value: name
        },
        {
            key: "y",
            value: age
        }
    ])

    if(response.data.Response === "False" || !response.data.Search){
        alert("Nismo pronasli film")
        return
    }

    getMovieDatas(response)

    console.log(response.data);
    


}

searchBtn?.addEventListener("click",() => {

    const movieName = titleInput?.value ?? ""
    const movieYear = ageSelect?.value ?? ""

    searchMovie(movieName, movieYear)
})


