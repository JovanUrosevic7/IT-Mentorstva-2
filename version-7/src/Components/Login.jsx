import { useState } from "react";
import { useUserStore } from "../States/userState";
import {useForm} from "react-hook-form"

function Login() {

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm()

    const setUserState = useUserStore((state) => state.setUserState)

    const handleLogin = (data) => {
        if (data.email !== "admin@admin.com" || data.password !== "123456") {

            setError("errorData", {
                type: "manual",
                message: "Entered data are incorrect"
            })

            return
        }

        setUserState({
            "loggedIn": true,
            "email": data.email,
        })

    }

    const userData = useUserStore((state) => state.userState)

    const logoutUser = () => {
        setUserState({})
    }

    

    return (
        <div>

            {!userData.loggedIn ? (
                <form action="" onSubmit={handleSubmit(handleLogin)}>

                    {errors.errorData && <p>{errors.errorData.message}</p>}
                    
                    <input type="text" placeholder="Email" {...register("email")}  />
                    
                    <input type="password" placeholder="Password" {...register("password")} />
                    
                    <button  >Login</button>
                </form>
            ) : (

                <button type="button" onClick={logoutUser}>Logout</button>
            )}



        </div>
    )
}

export default Login