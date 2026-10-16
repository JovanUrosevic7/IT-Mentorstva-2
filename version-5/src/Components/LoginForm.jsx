import { useState } from "react"
import { useForm } from "react-hook-form"
import { EmailValidator } from "../Validators/EmailValidator"
import { PasswordValidator } from "../Validators/PasswordValidator"

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

                {errors.email && <p>{errors.email.message}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email", EmailValidator)}
                />

                {errors.password && <p>{errors.password.message}</p>}
                <input
                    {...register("password", PasswordValidator)}
                    type="password"
                    placeholder="Password"
                />

                <button >Login</button>
            </form>

        </div>
    )
}

export default LoginForm