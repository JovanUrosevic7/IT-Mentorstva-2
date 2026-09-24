const apiUrl = "https://api.themoviedb.org/3/"
let apiKey = "9ea24a3810d4f3b8f8401b2fc6644319"

let movieList = document.querySelector("#movieList")

document.querySelector("#searchBtn").addEventListener("click", async function(){
    let movieName = document.querySelector("#searchMovie").value.trim()
    if(!movieName) return    
    
    let response = await callTMDbApi(`search/movie`,`query=${encodeURIComponent(movieName)}`)

    if (!response.results || response.results.length === 0) {
        movieList.innerHTML = "<p>Nema pronađenih filmova.</p>";
        return;
    }

    console.log(response.results);
    

    for(let i=0;i<response.results.length;i++){

        let movie = response.results[i]

        console.log(response.results[i]);
        
        let movieHolder = document.createElement("a")
        movieHolder.classList = "movieHolder"
        movieHolder.setAttribute("href", "movie.html?id="+movie.id)
        // movieHolder.setAttribute("target","_blank")


        let movieTitle = document.createElement("h3")
        movieTitle.innerHTML = movie.original_title

        const imageBaseUrl = "https://image.tmdb.org/t/p/w200";
        let movieImage = document.createElement("img")
        if (movie.poster_path) {
            movieImage.src = imageBaseUrl + movie.poster_path;
        } else {
            movieImage.src = "https://via.placeholder.com/500x750?text=Nema+Slike";
        }

        let movieType = document.createElement("p")
        movieType.innerHTML = "Movie"
        
        let movieYear = document.createElement("p")
        movieYear.innerHTML = movie.release_date ? movie.release_date.split("-")[0] : "N/A"
        
        movieHolder.append(movieTitle, movieImage, movieType, movieYear)

        movieList.append(movieHolder)
        
    }
    
})

async function callTMDbApi(endpoint, params = "") {
    const url = `${apiUrl}${endpoint}?api_key=${apiKey}&${params}`

    const response = await fetch(url)
    const result = await response.json()

    return result

}