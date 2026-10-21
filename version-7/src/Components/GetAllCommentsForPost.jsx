import { useTasksState } from "../States/taskState";

function GetAllCommentsForPost({comments, taskId}) {

    if (!Array.isArray(comments)) return null;

    const taskData = useTasksState((state) => state.taskState)
    const updateTaskState = useTasksState((state) => state.updateTaskState)

    const deleteComment = (comment, taskId) => {
        
        const taskWithComments = taskData.map(task => {
            if(task.id === parseInt(taskId)){
                const updatedComments = task.comments.filter(taskComment => taskComment !== comment)
                return {
                    ...task,
                    comments: updatedComments
                }
            }

            return task
        })

        updateTaskState(taskWithComments)

    }

    return (
        <div>
            {comments.map((comment, index) => (
                <div key={index}>
        
                    <p>{comment}</p>
        
                    <button onClick={() => deleteComment(comment, taskId)}>Delete comment</button>
        
                </div>
            ))}
        </div>
    )
}

export default GetAllCommentsForPost