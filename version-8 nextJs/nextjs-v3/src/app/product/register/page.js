"use client"

import { useState } from "react"

function Register() {

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    const createProduct = async () => {
        fetch("/api/register", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                description: description,
                price: price
            })
        })


    }



    return (
        <div>

            <form >
                <input onChange={e => setTitle(e.currentTarget.value)} type="text" placeholder="Naziv proizvoda" />
                <input onChange={e => setPrice(e.currentTarget.value)} type="number" placeholder="Cena proizvoda" />
                <input onChange={e => setDescription(e.currentTarget.value)} type="text" placeholder="Opis proizvoda" />

                <button onClick={() => createProduct()} type="button">Dodaj proizvod</button>
            </form>
        </div> 
    )
}

export default Register

