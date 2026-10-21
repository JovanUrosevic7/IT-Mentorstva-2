import { useForm } from "react-hook-form"

function CommentForm({ task }) {

    const {
        register,
        handleSubmit
    } = useForm()

    const postComment = (data) => {
        console.log(data);
        
    }

    return (
        <form action="" className="flex flex-col items-center gap-[5px]" onSubmit={handleSubmit(postComment)}>

            <input type="hidden" defaultValue={task.id} {...register("taskId")} />

            <input type="text" placeholder="Comment" className="border min-w-[100px]" {...register("comment")} />

            <button className="border bg-blue-500">Post comment</button>
        </form>
    )
}

export default CommentForm