import MovieCard from "./Snippets/MovieCard"

function SearchResults({movies}) {

    if (!movies || !Array.isArray(movies)) {
        return <div className="text-white text-center py-6">Učitavanje filmova...</div>;
    }


    return (
        <div className=" bg-gray-800 w-full py-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbID || movie.id} movieDatas={movie} />
                ))
                    
                }
            </div>

        </div>
    )
}

export default SearchResults