
function Search({searchTerm, setSearchTerm}) {



    return (
        <div>

            <input 
                type="text" 
                placeholder="Search album" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.currentTarget.value)} 
                className="border" 
            />

        </div>
    )
}

export default Search