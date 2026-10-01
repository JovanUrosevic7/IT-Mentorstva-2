export function getMovieDatas(response){

    response.data.Search.forEach((movie: {Title: string, Poster: string}) => {        

        let movieTitle = document.createElement("h3") as HTMLHeadElement
        let moviePoster = document.createElement("img") as HTMLImageElement
        let movieHolder = document.createElement("div") as HTMLDivElement

        movieTitle.textContent = movie.Title
        moviePoster.src = movie.Poster

        movieHolder.append(movieTitle, moviePoster)

        movieList?.append(movieHolder)

    })

}