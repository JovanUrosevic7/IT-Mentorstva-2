import { useState } from "react";
import { useUserStore } from "../States/userState";

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const setUserState = useUserStore((state) => state.setUserState)
    
    const handleLogin = () => {
        if(email !== "admin@admin.com" || password !== "123456") return

        setUserState({
            "loggedIn": true,
            // "email": email,
        })
        
        
    }


    return (
        <div>

            <form action="">
                <input type="text" placeholder="Email" onInput={(e) => setEmail(e.currentTarget.value)}/>
                <input type="password" placeholder="Password" onInput={(e) => setPassword(e.currentTarget.value)}/>
                <button type="button" onClick={handleLogin}>Login</button>
            </form>


        </div>
    )
}

export default Login