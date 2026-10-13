
function MovieCard({movieDatas}) {
  return (
    <div>


        <div className="text-white mx-auto">
            <img src={movieDatas.Poster} alt="" className="w-[300px] h-[400px]"/>
            <h1 className="text-xl">{movieDatas.Title}</h1>
            <p>{movieDatas.Year}</p>
        </div>



    </div>
  )
}

export default MovieCard