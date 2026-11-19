/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,

} from "firebase/auth";
import {auth} from "../firebase/config"


const AuthContext = createContext()


export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(false)

    async function signup(email, password, fullName){
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)

        if(fullName){
            await updateProfile(userCredential.user, {displayName: fullName})
        }

        return userCredential
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        return signOut(auth)
    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )


}


















