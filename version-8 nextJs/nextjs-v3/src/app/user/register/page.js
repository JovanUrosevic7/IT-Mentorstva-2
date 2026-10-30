"use client"

import {auth} from "@/app/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";


export default function Register(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    

    const register = async (e) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)        
    }


    return <>

        <form >
            <input type="text" placeholder="Unesite email" onChange={(e) => setEmail(e.currentTarget.value)}/>
            <input type="text" placeholder="Unesite password" onChange={(e) => setPassword(e.currentTarget.value)} />
            <button onClick={(e) => register(e)}>Register</button>

        </form>

    </>

}