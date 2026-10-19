import {create} from "zustand"


export const useUserStore = create((set) => ({
    userState: {},
    setUserState: (newState: any) => set({userState: newState})
}))




