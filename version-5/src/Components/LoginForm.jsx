import { useState } from "react"
import {useForm} from "react-hook-form"

function LoginForm() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data)

    const [password, setPassword] = useState(null)
    const [passwordError, setPasswordError] = useState(null)

    const passwordCheck = (newPassword) => {

        newPassword = newPassword.trim()

        if (newPassword !== "") {
            setPasswordError("")
            setPassword(newPassword)
        } else {
            setPasswordError("Morate uneti validnu sifru")
        }

    }


    return (
        <div>

            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Username" />
                <p>{passwordError}</p>
                {errors.password && <p>Password is required</p>}
                <input {...register("password", {required: true})} type="password" placeholder="Password" onInput={(e) => passwordCheck(e.currentTarget.value)} />
                <button >Login</button>
            </form>

        </div>
    )
}

export default LoginForm