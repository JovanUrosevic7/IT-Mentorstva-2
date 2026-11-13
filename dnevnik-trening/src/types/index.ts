export interface User{
    username: string,
    password: string
    name: string,
}

export interface Exercise{
    id: string,
    name: string,
    date: number,
    reps: number,
    sets: number,
    weight: number
}

export type WorkoutType = "snaga" | "kardio" | "istezanje"

export const WORKOUT_TYPES: {id: WorkoutType; label: string}[] = [
    {id: "snaga", label: "Snaga"},
    {id: "kardio", label: "Kardio"},
    {id: "istezanje", label: "Istezanje"}
]

export interface Workout{

    id: string,
    username: string,
    date: string,
    type: WorkoutType,
    duration: number,
    exercises: Exercise[]

}
