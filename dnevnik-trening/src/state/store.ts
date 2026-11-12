import type { User } from "../types";
import {create} from "zustand"
import { currentUserAtom } from "./atoms";




interface AppState {
    currentUser: User | null
    setCurrentUser: (user: User | null) => void
}

export const useAppStore = create<AppState>(){

    persist(
        (set) => ({
            currentUser: null,
            setCurrentUser: (user) => set({currentUser: user})
        }),
        {
            name: "dnevnik_auth_storage"
        }
    )

}

