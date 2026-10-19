import {create} from "zustand"
import {persist} from "zustand/middleware"

export const useUserStore = create(
    persist(
        (set) => ({
            userState: {},
            setUserState: (newState: any) => set({userState: newState}),    
        }),
        {
            name:"userData"
        }
    )
)




