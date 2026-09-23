const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get("id")

const apiKeyTMDB = "9ea24a3810d4f3b8f8401b2fc6644319"

// https://api.themoviedb.org/3/find/tt0103064?api_key=9ea24a3810d4f3b8f8401b2fc6644319&external_source=imdb_id

let apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKeyTMDB}&append_to_response=videos`

console.log(apiUrl);


async function movieTrailer() {
    
    try{

        const response = await fetch(apiUrl)
        const data = await response.json()

        console.log(data);
        

    } catch(error) {
        console.error("Doslo je do greske prilikom ucitavanja trailera", error);
        

    }


}

movieTrailer()


