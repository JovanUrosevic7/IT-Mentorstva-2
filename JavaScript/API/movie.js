const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get("id")

const apiKeyTMDB = "9ea24a3810d4f3b8f8401b2fc6644319"

// https://api.themoviedb.org/3/find/tt0103064?api_key=9ea24a3810d4f3b8f8401b2fc6644319&external_source=imdb_id

let apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKeyTMDB}&append_to_response=videos`

let movieTitle = document.querySelector("#movieTitle")
let trailerContainer = document.querySelector("#trailerContainer")

async function movieTrailer() {
    
    try{

        const response = await fetch(apiUrl)
        const data = await response.json()

        console.log(data);
        
        const videos = data.videos ? data.videos.results : []
        const trailer = videos.find(v => v.site === "YouTube" && v.type === "Trailer")

        movieTitle.append(data.title)
        

        if(trailer) {
            trailerContainer.innerHTML = 
            `
                <iframe 
                    style="border: 1px solid black;"
                    width="500" 
                    height="450" 
                    src="https://www.youtube.com/embed/${trailer.key}" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            `
            

        } else {
            trailerContainer.innerHTML = "<p>Žao nam je, trejler za ovaj film nije dostupan.</p>";

        }
            

        


    } catch(error) {
        console.error("Doslo je do greske prilikom ucitavanja trailera", error);
        console.log(`https://www.youtube.com/embed/${trailer.key}`);
        console.log(`https://www.youtube.com/embed/${trailer.key}`);

        

    }


}

movieTrailer()


