"use client"

import React, { useState } from 'react'

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const loginUser = () => {

        fetch('/api/auth_user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })

    }


    return (
        <div>
            <form>
                <input type='text' placeholder='Ime' onChange={(e) => setUsername(e.currentTarget.value)} />
                <input type='password' placeholder='Sifra' onChange={(e) => setPassword(e.currentTarget.value)} />

                <button type='button' onClick={() => loginUser()}>Login</button>
            </form>
        </div>
    )
}

export default Login