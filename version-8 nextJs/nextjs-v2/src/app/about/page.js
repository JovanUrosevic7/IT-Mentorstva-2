
async function page() {

  const response = await fetch("https://dummyjson.com/posts?limit=1")
  const data = await response.json()
  const post = data["posts"][0];
  
  console.log(data);
  console.log(post);
  

  
  return (
    <div>

        <h1>{post.title}</h1>

        <img
            src="/images/f1.avif"
            alt="Formula 1 image"
            width={150}
            height={100}
        />

    </div>
  )
}

export default page