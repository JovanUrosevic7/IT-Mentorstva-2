import { useEffect, useState } from "react"
import { useTasksState } from "../States/taskState"
import { useUserStore } from "../States/userState"
import CreateTasks from "./CreateTasks"
import { categories } from "../Utils/Categories"
import { useForm } from "react-hook-form"
import CommentForm from "./CommentForm"

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
            if (task.id === data.taskId) {
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

                    <p className="text-2xl my-[10px]">Tasks:</p>

                    <div className="flex flex-wrap gap-[10px]">

                        {taskData.map(task => (

                            <div key={task.id} >

                                {editTaskId == task.id ? (

                                    <form action="" onSubmit={handleSubmit(updateTask)} className="flex flex-col gap-[5px] bg-yellow-200">

                                        <input type="hidden" defaultValue={task.id} {...register("taskId")} />

                                        <input type="text" defaultValue={task.name} {...register("taskName")} className="border min-w-[100px]" />

                                        <select {...register("category")} defaultValue={task.category} className="border">

                                            {categories.map((category) => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}

                                        </select>

                                        <button className="border">Update task</button>

                                    </form>
                                ) : (


                                    <div className="w-[200px] flex flex-col gap-[10px] bg-blue-100">
                                        <p onClick={() => setEditTaskId(task.id)} className="border min-w-[100px]" >{task.name}</p>
                                        
                                        <p onClick={() => setEditTaskId(task.id)} className="border min-w-[100px]" >{task.category}</p>

                                        <CommentForm task={task}/>

                                        <button type="button" onClick={() => deleteTask(task.id)} className="border border-black text-red-500">Delete task</button>
                                    </div>
                                )}



                            </div>
                        ))}



                    </div>

                </div>
            )}
        </div>
    )
}

export default Tasks


