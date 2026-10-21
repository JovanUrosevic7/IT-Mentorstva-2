
function GetAllCommentsForPost({comments}) {

    if (!Array.isArray(comments)) return null;

    return (
        <div>
            {comments.map((comment, index) => (
                
                <p key={index}>{comment}</p>
            ))}
        </div>
    )
}

export default GetAllCommentsForPost