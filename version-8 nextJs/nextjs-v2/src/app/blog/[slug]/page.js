
async function page({params}) {

    const resolvedParams = await params
    const slug = resolvedParams.slug


    const blogPosts = [
        {
            name: "First-blog",
            description: "Lorem ipsum 1",
            slug: "first-blog"
        },
        {
            name: "Second-blog",
            description: "Lorem ipsum 1",
            slug: "second-blog"
        }
    ]

    const blog = blogPosts.find(post => post.slug === slug)

    if(typeof blog === "undefined"){
        console.log("ne postoji");
        
    }

  return (
    <div>
        <p>{blog.name}</p>
        <p>{blog.description}</p>
        <p>{blog.slug}</p>
    </div>
  )
}

export default page