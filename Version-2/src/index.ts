import { generateYears } from "./helpers/generateYears";
import { getMovieDatas } from "./helpers/takingMovieDatas";
import { ApiSuccessInterface } from "./interfaces/ApiSuccessInterface";
import { SingleMovieSearch } from "./interfaces/movieStorage/SingleMovieSearch";
import { clearExistingMovies, getAllMovieSearches, remeberMovieSearch } from "./repository/movieStorage";
import { buildUrl, callOmdbApi } from "./services/omdbApiServices";


const titleInput = document.querySelector("#titleInput") as HTMLInputElement | null
const ageSelect = document.querySelector("#ageSelect") as HTMLSelectElement | null
const searchBtn = document.querySelector("#searchBtn") as HTMLButtonElement | null
const movieList = document.querySelector("#movieList") as HTMLDivElement | null
const existingMovieDiv = document.querySelector("#searchedMovies") as HTMLDivElement | null
const clearSearchesBtn = document.querySelector("#clearSearchesBtn") as HTMLButtonElement | null


if (ageSelect) {
    generateYears(1960, ageSelect, 2026);
}

listAllMovieLabels()

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
        { key: "s", value: name },
        { key: "y", value: age }
    ]);

    // 2. Ako prva pretraga nije uspela, a korisnik JE izabrao godinu, pokušavamo rezervnu pretragu SAMO po nazivu
    if ((response.data.Response === "False" || !response.data.Search) && age !== "") {
        console.warn(`Nema rezultata za godinu ${age}. Pokrećemo pretragu samo po nazivu...`);

        response = await callOmdbApi([
            { key: "s", value: name }
        ]);

        // Opciono: Obaveštavamo korisnika da je primenjen fallback
        if (response.data.Response === "True" && response.data.Search) {
            alert(`Nismo pronašli film iz ${age}. godine, ali evo svih ostalih filmova sa nazivom "${name}":`);
        }
    }

    // 3. Ako i dalje nema rezultata (ni nakon rezervne pretrage), obaveštavamo korisnika
    if (response.data.Response === "False" || !response.data.Search) {
        alert("Nismo pronašli nijedan film sa tim nazivom.");
        return;
    }

    if(response.data){
        
        remeberMovieSearch(
            {
                name: name,
                year: age
            }
        )
    }

    listAllMovieLabels()

    getMovieDatas(response.data.Search, movieList)    


}

searchBtn?.addEventListener("click",() => {

    const movieName = titleInput?.value ?? ""
    const movieYear = ageSelect?.value ?? ""

    searchMovie(movieName, movieYear)
})

function listAllMovieLabels(): void{

    existingMovieDiv.innerHTML = ""

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

clearSearchesBtn?.addEventListener("click", (): void => {

    clearExistingMovies()
    existingMovieDiv.innerHTML = ""

})









