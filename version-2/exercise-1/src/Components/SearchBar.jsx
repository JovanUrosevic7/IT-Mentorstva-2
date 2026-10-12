


function SearchBar({ videos, onSearchVideo }) {

    const SearchVideoByName = (name) => {

        let foundVideos = []

        videos.forEach(video => {

            // if(name.toLowerCase() === video.title.toLowerCase()){
            //     console.log(video.title);

            // }

            let videoTitle = video.title.toLocaleLowerCase()

            if (videoTitle.includes(name.toLowerCase())) {
                foundVideos.push(video)
            }

        })

        onSearchVideo(foundVideos)
        
    }


    return (
        <form>
            <label>
                Search:
                <input type="text" name="search" onInput={(e) => SearchVideoByName(e.currentTarget.value)} className="border" />
            </label>
        </form>


    )
}



export default SearchBar