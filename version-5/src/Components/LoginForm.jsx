import { useState } from "react"

function LoginForm() {

    const [password, setPassword] = useState(null)

    const passwordCheck = (newPassword) => {

        newPassword = password.trim()

        if(newPassword !== ""){
            setPassword(newPassword)
            
        }

    }


    return (
        <div>

            <form action="">
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" onInput={(e) => passwordCheck(e.currentTarget.value)} />
                <button type="button">Login</button>
            </form>

        </div>
    )
}

export default LoginForm