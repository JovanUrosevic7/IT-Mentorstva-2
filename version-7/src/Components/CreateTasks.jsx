import { useState } from "react"
import { useTasksState } from "../States/taskState"
import {useForm} from "react-hook-form"
import { categories } from "../Utils/Categories"

function CreateTasks() {

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const [taskName, setTaskName] = useState("")

    const setTasksState = useTasksState((state) => state.setTasksState)
    
    const tasks = useTasksState((state) => state.taskState)    

    const createTask = (data) => {
        if (!data.taskName.trim()) return

        let taskFound = false

        tasks.forEach((task) => {
            if(task.name === data.taskName){
                taskFound = true
            }
        })

        const newTask = {
            id: Date.now(),
            name: data.taskName,
            category: data.category
        }

        if(!taskFound){
            setTasksState(newTask)
        }

        reset()


    }

    // console.log(tasks);
    

    return (
        <div>
            <form action="" onSubmit={handleSubmit(createTask)}>
                
                <input type="text" placeholder="Enter Title of the task" {...register("taskName", {
                    required: "Task name is required."
                })} />

                <select name="" id="" {...register("category")}>
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                
                <button >Create Task</button>
                
                {errors.taskName && <p>Task name is required</p>}
            </form>
        </div>
    )
}

export default CreateTasks