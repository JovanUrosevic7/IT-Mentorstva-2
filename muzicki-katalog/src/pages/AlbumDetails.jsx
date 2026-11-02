import { useParams } from "react-router-dom"

function AlbumDetails() {

    const {id} = useParams()

    return (
        <div>
            AlbumDetails

            {id}
        </div>
    )
}

export default AlbumDetails