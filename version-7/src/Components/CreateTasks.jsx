import { useState } from "react"
import { useTasksState } from "../States/taskState"

function CreateTasks() {

    const [taskName, setTaskName] = useState("")

    const setTasksState = useTasksState((state) => state.setTasksState)

    const createTask = () => {
        if(!taskName.trim()) return

        setTasksState(taskName)
        setTaskName("")
    }

    return (
        <div>
            <form action="">
                <input type="text" placeholder="Enter Title of the task" value={taskName} onInput={e => setTaskName(e.currentTarget.value)} />
                <button type="button" onClick={createTask}>Create Task</button>
            </form>
        </div>
    )
}

export default CreateTasks