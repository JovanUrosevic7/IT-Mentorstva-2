import { useTasksState } from "../States/taskState"
import { useUserStore } from "../States/userState"
import CreateTasks from "./CreateTasks"

function Tasks() {

    const userData = useUserStore((state) => state.userState)

    const taskData = useTasksState((state) => state.taskState)    

    const deleteTask = useTasksState((state) => state.deleteTaskState)

    return (
        <div>
            {userData.loggedIn && (
                <div>
                    <CreateTasks />
                    Tasks:
                    {taskData.map(task => (
                        <div key={task.id}>
                            <p>{task.name}</p>
                            <p>{task.category}</p>
                            <button type="button" onClick={() => deleteTask(task.id)}>Delete task</button>
                        </div>
                    ))}

                </div>
            )}
        </div>
    )
}

export default Tasks