import { atom, type AtomEffect } from "recoil";
import type { User } from "../types";



const localStorageEffect = <T>(key: string): AtomEffect<T> => ({setSelf, onSet}) => {

    const savedValue = localStorage.getItem(key)
    if(savedValue !== null){
        setSelf(JSON.parse(savedValue))
    }

    onSet((newValue, _, isReset) => {
        if(isReset){
            localStorage.removeItem(key)
        }else{
            localStorage.setItem(key, JSON.stringify(newValue))
        }
    })

}


export const currentUserAtom = atom<User | null>({
    key: "currentUserAtom",
    default: null,
    effects: [localStorageEffect("dnevnik_current_user")]
}) 


