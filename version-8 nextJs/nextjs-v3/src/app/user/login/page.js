"use client"

import { useAuth } from '@/app/context/authContext'
import React, { useState } from 'react'
import {auth} from "@/app/firebase"
import {signInWithEmailAndPassword} from "firebase/auth"

function Login() {

    const {loggedIn} = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const loginUser = async (e) => {

        fetch('/api/auth_user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })

        signInWithEmailAndPassword(auth, email, password)

    }


    return (
        <div>
            <form>
                <input type='text' placeholder='Email' onChange={(e) => setEmail(e.currentTarget.value)} />
                <input type='password' placeholder='Sifra' onChange={(e) => setPassword(e.currentTarget.value)} />

                <button type='button' onClick={() => loginUser()}>Login</button>
            </form>

            
        </div>
    )
}

export default Login