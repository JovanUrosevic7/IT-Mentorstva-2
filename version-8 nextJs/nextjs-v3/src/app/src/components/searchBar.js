"use client"

function SearchBar() {

    const searchProduct = (searchTerm) => {
        console.log(searchTerm);
        
    }
    

    return (
        <div>

            <form>
                <input type="text" placeholder="Search product" onChange={(e) => searchProduct(e.currentTarget.value)}/>
                
                <button>Search</button>


            </form>
        </div>
    )
}

export default SearchBar