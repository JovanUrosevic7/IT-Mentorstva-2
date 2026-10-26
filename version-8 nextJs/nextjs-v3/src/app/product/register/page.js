"use client"

import { useState } from "react"

function register() {

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDecription] = useState("")

    const createProduct = () => {
        console.log("works");
        
    }


    return (
        <div>

            <form >
                <input onChange={e => setTitle(e.currentTarget.value)} type="text" placeholder="Naziv proizvoda" />
                <input onChange={e => setPrice(e.currentTarget.value)} type="number" placeholder="Cena proizvoda" />
                <input onChange={e => setDecription(e.currentTarget.value)} type="text" placeholder="Opis proizvoda" />
                <button onClick={createProduct} type="button">Dodaj proizvod</button>
            </form>
        </div> 
    )
}

export default register