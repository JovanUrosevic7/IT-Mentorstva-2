import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useTasksState = create(
    persist(
        (set) => ({
            taskState: [],
            setTasksState: (newTask) =>
                set((state) => ({
                    taskState: [...state.taskState, newTask]
                })),
            
            deleteTaskState: (deleteTask) =>
                set((state) => ({
                    taskState: state.taskState.filter(task => task !== deleteTask)
                })),

            updateTaskState: (updatedTask) =>
                set(() => ({
                    taskState: updatedTask
                })) 
        }),
        {
            name: "userTasks"
        }
    )

)





