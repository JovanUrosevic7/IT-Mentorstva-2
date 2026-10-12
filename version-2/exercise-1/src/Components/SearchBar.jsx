import VIDEOS from "../videos.json"



function SearchBar() {




    return (
        <form>
            <label>
                Search:
                <input type="text" name="search" onInput={(e) => SearchVideoByName(e.currentTarget.value)} className="border"/>
            </label>
        </form>
        
        
    )
}

const SearchVideoByName = (name) => {

    VIDEOS.forEach(video => {

        // if(name.toLowerCase() === video.title.toLowerCase()){
        //     console.log(video.title);
            
        // }

        let videoTitle = video.title.toLocaleLowerCase()

        if(videoTitle.includes(name.toLowerCase())){
            console.log(video.title);
            
        }

    })
}

export default SearchBar