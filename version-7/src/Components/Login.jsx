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
        <div className="">

            {!userData.loggedIn ? (
                <form action="" onSubmit={handleSubmit(handleLogin)} className="flex gap-[10px]">

                    {errors.errorData && <p>{errors.errorData.message}</p>}
                    
                    <input type="text" placeholder="Email" {...register("email")}  className="border"/>
                    
                    <input type="password" placeholder="Password" {...register("password")} className="border"/>
                    
                    <button  className="border">Login</button>
                </form>
            ) : (

                <button type="button" onClick={logoutUser} className="border-b border-yellow-500">Logout</button>
            )}



        </div>
    )
}

export default Login