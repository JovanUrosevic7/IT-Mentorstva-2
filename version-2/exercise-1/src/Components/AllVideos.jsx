import VIDEOS from "../videos.json"

function AllVideos() {



    return (
    
        <div>

            {VIDEOS.map((item, index) => (

                <div key={index} className="mb-[10px] w-[300px  ]">
                    <h1>{item.title}</h1>
                    <a href={item.url} target="_blank" className="cursor-pointer">
                        <img src={item.cover} className="w-[300px]"></img>
                    </a>
                </div>

            ))}

        </div>
    
    
    )
}

export default AllVideos