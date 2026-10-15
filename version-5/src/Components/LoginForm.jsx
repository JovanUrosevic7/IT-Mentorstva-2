import { useState } from "react"
import {useForm} from "react-hook-form"

function LoginForm() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const formSubmitted = (data) => console.log(data)


    return (
        <div>

            <form action="" onSubmit={handleSubmit(formSubmitted)}>
                <input type="text" placeholder="Username" />

                {errors.password && <p>Password is required</p>}
                <input {...register("password", {
                    required: true,
                    validate:{
                        trimCheck: value => value.trim() !== "" || "Password cannot be empty or space only"
                    }
                })} type="password" placeholder="Password"  />
                <button >Login</button>
            </form>

        </div>
    )
}

export default LoginForm