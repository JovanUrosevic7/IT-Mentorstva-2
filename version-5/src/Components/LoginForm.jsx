import { useState } from "react"
import { useForm } from "react-hook-form"
import { EmailValidator } from "../Validators/EmailValidator"

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
                    {...register("password", {
                        required: true,
                        validate: {
                            trimCheck: value => value.trim() !== "" || "Password cannot be empty or space only"
                        }
                    })}
                    type="password"
                    placeholder="Password"
                />

                <button >Login</button>
            </form>

        </div>
    )
}

export default LoginForm