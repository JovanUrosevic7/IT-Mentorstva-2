import { useEffect, useState } from "react"
import { useTasksState } from "../States/taskState"
import { useUserStore } from "../States/userState"
import CreateTasks from "./CreateTasks"
import { categories } from "../Utils/Categories"
import { useForm } from "react-hook-form"

function Tasks() {

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const [editTaskId, setEditTaskId] = useState()

    const userData = useUserStore((state) => state.userState)
    const taskData = useTasksState((state) => state.taskState)
    const updateTaskState = useTasksState((state) => state.updateTaskState)
    const deleteTask = useTasksState((state) => state.deleteTaskState)

    // console.log(editTaskId);


    const updateTask = (data) => {
        setEditTaskId(null)

        const updateTasks = taskData.map(task => {
            if(task.id === data.taskId){
                return {
                    ...task,
                    name: data.taskName,
                    category: data.category
                }
            }

            return task
        })

        console.log(updateTasks);
        updateTaskState(updateTasks)
        
        
    }





    useEffect(() => {
        if (editTaskId) {
            const taskToEdit = taskData.find(task => task.id === editTaskId)
            if (taskToEdit) {
                reset({
                    taskId: taskToEdit.id,
                    taskName: taskToEdit.name,
                    category: taskToEdit.category
                })
            }
        }
    }, [editTaskId, reset, taskData])


    return (
        <div>
            {userData.loggedIn && (
                <div>
                    <CreateTasks />
                    Tasks:
                    {taskData.map(task => (

                        <div key={task.id}>

                            {editTaskId == task.id ? (

                                <form action="" onSubmit={handleSubmit(updateTask)} >

                                    <input type="hidden" defaultValue={task.id} {...register("taskId")} />

                                    <input type="text" defaultValue={task.name} {...register("taskName")} />

                                    <select {...register("category")} defaultValue={task.category}>

                                        {categories.map((category) => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}

                                    </select>

                                    <button >Update task</button>

                                </form>
                            ) : (


                                <div >
                                    <p onClick={() => setEditTaskId(task.id)}>{task.name}</p>
                                    <p onClick={() => setEditTaskId(task.id)}>{task.category}</p>
                                    <button type="button" onClick={() => deleteTask(task.id)}>Delete task</button>
                                </div>
                            )}



                        </div>
                    ))}

                </div>
            )}
        </div>
    )
}

export default Tasks


