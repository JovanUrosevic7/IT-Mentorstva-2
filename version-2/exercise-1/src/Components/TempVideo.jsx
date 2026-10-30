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

    if (videoFound) {
        console.log("postoji");

    } else {
        console.log("ne postoji");
        
    }

    if (videoFound) {
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
    } else {
        return (
            <div>
                <h1>VIDEO does not exist</h1>
                
            </div>
        )
    }


}

export default TempVideo