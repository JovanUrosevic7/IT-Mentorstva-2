import { useState } from "react"
import { useTasksState } from "../States/taskState"
import {useForm} from "react-hook-form"


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

    const createTask = (data) => {
        if (!data.taskName.trim()) return

        setTasksState(data.taskName)
        reset()
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit(createTask)}>
                
                <input type="text" placeholder="Enter Title of the task" {...register("taskName")} />
                
                <button >Create Task</button>
            </form>
        </div>
    )
}

export default CreateTasks