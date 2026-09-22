const apiUrl = "http://www.omdbapi.com/"
let apiKey = "450e8dbe"

let response = await callOMDbApi("t=Terminator")
console.log(response);


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