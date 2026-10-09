
function App() {


  const VIDEOS = [
    {
      id: 1,
      title: "How to learn React",
      url: "https://www.youtube.com/watch?v=SqcY0GlETPk&t=163s&pp=ygUSaG93IHRvIGxlYXJuIHJlYWN00gcJCTcMAYcqIYzv",
      cover: "https://i.ytimg.com/vi/SqcY0GlETPk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBvF7R7tYEZqgAYn6fM5A_QgI1e-A"
    },

    {
      id: 2,
      title: "How to learn JavaScript",
      url: "https://www.youtube.com/watch?v=W6NZfCO5SIk&pp=ygUXaG93IHRvIGxlYXJuIGphdmFzY3JpcHQ%3D",
      cover: "https://i.ytimg.com/vi/W6NZfCO5SIk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBAlzpYlr0w53HlpbOkOxXqVe137g"
    }
  ]


  return (
    <div className="m-4">

      {VIDEOS.map((item, index) => (

        <div key={index} className="mb-[10px]">
          <h1>{item.title}</h1>
          <a href={item.url} target="_blank" className="cursor-pointer">
            <img src={item.cover} className="w-[300px]"></img>
          </a>
        </div>

      ))}

    </div>
  )
}

export default App
