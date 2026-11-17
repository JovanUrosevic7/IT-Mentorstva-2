import type { User, Workout } from "../types";
import {create} from "zustand"
import {persist} from "zustand/middleware"

interface AppState {
    currentUser: User | null
    setCurrentUser: (user: User | null) => void

    workouts: Workout[];
    addWorkout: (workout: Omit<Workout, "id" | "username">) => void
    deleteWorkout: (id: string) => void;
    updatedWorkout: (workout: Workout) => void
}

export const useAppStore = create<AppState>()(

    persist(
        (set, get) => ({
            currentUser: null,
            setCurrentUser: (user) => set({currentUser: user}),
        
            workouts: [],

            addWorkout: (newWorkoutData) => {

                const currentUser = get().currentUser
                if(!currentUser) return

                const newWorkout: Workout = {
                    ...newWorkoutData,
                    id: Date.now().toString(),
                    username: currentUser.username
                }

                set((state) => ({
                    workouts: [newWorkout, ...state.workouts]
                }))

            },
        
            deleteWorkout: (id) => {
                set((state) => ({
                    workouts: state.workouts.filter((w) => w.id !== id)
                }))
            },

            updatedWorkout: (updateWorkout) => {
                set((state) => ({
                    workouts: state.workouts.map((w) => w.id === updateWorkout.id ? updateWorkout : w)
                }))
            }

        }),


        {
            name: "dnevnik_auth_storage"
        }
    )

)

