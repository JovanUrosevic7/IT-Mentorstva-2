import MovieCard from "./Snippets/MovieCard"

function SearchResults() {




    return (
        <div className=" bg-gray-800 w-full py-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
            </div>

        </div>
    )
}

export default SearchResults