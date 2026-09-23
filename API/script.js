const apiUrl = "http://www.omdbapi.com/"
let apiKey = "450e8dbe"

let movieList = document.querySelector("#movieList")

document.querySelector("#searchBtn").addEventListener("click", async function(){
    let movieName = document.querySelector("#searchMovie").value
    let response = await callOMDbApi(`s=${movieName}`)

    for(let i=0;i<response.Search.length;i++){

        console.log(response.Search[i]);
        
        
        let movieHolder = document.createElement("div")
        movieHolder.classList = "movieHolder"

        let movieTitle = document.createElement("h3")
        movieTitle.innerHTML = response.Search[i].Title

        let movieImage = document.createElement("img")
        movieImage.src = response.Search[i].Poster

        let movieType = document.createElement("p")
        movieType.innerHTML = response.Search[i].Type
        
        let movieYear = document.createElement("p")
        movieYear.innerHTML = response.Search[i].Year
        
        movieHolder.append(movieTitle, movieImage, movieType, movieYear)

        movieList.append(movieHolder)
        
    }
    
})





// getMovieByTitle("Home alone")

// async function getMovieByTitle(title){
//     let response = await callOMDbApi("t="+title)
//     console.log(response);
    
// }

async function callOMDbApi(params) {
    const url = apiUrl + "?apiKey=" + apiKey + "&" + params

    const response = await fetch(url)
    const result = await response.json()

    return result

}