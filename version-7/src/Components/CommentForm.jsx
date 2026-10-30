import { useForm } from "react-hook-form"

function CommentForm({ task, callbackPostComment }) {

    const {
        register,
        handleSubmit
    } = useForm()

    const postComment = (data) => {
        callbackPostComment(data);
        
    }

    return (
        <form action="" className="flex flex-col items-center gap-[5px]" onSubmit={handleSubmit(postComment)}>

            <input type="hidden" defaultValue={task.id} {...register("taskId")} />

            <input type="text" placeholder="Comment" className="border min-w-[100px]" {...register("comments")} />

            <button className="border bg-blue-500">Post comment</button>
        </form>
    )
}

export default CommentForm