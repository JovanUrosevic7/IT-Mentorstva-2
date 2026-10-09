import { useParams } from "react-router-dom";
import VIDEOS from "../videos.json"


const TempVideo = () => {

    const { id } = useParams()
    let videoFound = null

    VIDEOS.forEach(video => {

        if (video.id === parseInt(id)) {
            videoFound = video
        }

    })

    console.log(id);
    console.log(videoFound);


    return (
        <div>
            <h1>VIDEOS</h1>

            <div>
                <h1>{videoFound.title}</h1>
                <a href={videoFound.url} className="text-blue-800">Link od videa</a>
                <img src={videoFound.cover} alt="" />
            </div>
        </div>
    )
  
}

export default TempVideo