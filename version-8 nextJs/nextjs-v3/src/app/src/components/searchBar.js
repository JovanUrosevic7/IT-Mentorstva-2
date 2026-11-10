"use client"

import { useAuth } from "@/app/context/authContext"
import { auth } from "@/app/firebase";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react"

function SearchBar() {

    const {loggedIn} = useAuth()
    console.log(loggedIn);
    

    const [searchTerm, setSearchTerm] = useState("")
    const [timer, setTimer] = useState(null)
    const [searchResults, setSearchResults] = useState([])

    const searchProduct = async (searchTerm) => {
        const response = await fetch("http://localhost:3000/api/search?q="+searchTerm)
        const data = await response.json()
        setSearchResults(data.products)
        console.log(data.products);
        console.log(searchResults);
        
                
    }

    const logoutUser = (e) => {

        e.preventDefault()
        signOut(auth)
        window.location.reload()        

    }

    useEffect(() => {
        if(timer){
            clearTimeout(timer)
        }

        const newTimer = setTimeout(() => {
            searchProduct(searchTerm)
        }, 300);

        setTimer(newTimer)

        return () => clearTimeout(newTimer)

    }, [searchTerm])

    return (
        <div>

            <div>{loggedIn ? <button onClick={(e) => logoutUser(e)}>Logout</button> : <a href="user/login" >Login</a>}</div>

            <form>
                <input type="text" placeholder="Search product" onChange={(e) => setSearchTerm(e.currentTarget.value)}/>
                
                <button>Search</button>


            </form>

            <div>
                {searchResults && searchResults.map(product => (
                    <p key={product.id}>{product.title}</p>
                ))}
            </div>


        </div>
    )
}

export default SearchBar