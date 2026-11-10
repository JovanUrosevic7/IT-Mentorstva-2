
function Search({ searchTerm, setSearchTerm }) {



    return (
        <div className="w-full">
            <div className="relative flex items-center">
                {/* Opciono:mala lupa ikonica levo da izgleda moderno */}
                <span className="absolute left-3.5 text-slate-400 text-sm">
                    🔍
                </span>

                <input
                    type="text"
                    placeholder="Pretraži albume po nazivu ili izvođaču..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.currentTarget.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-2xs"
                />
            </div>
        </div>
    )
}

export default Search