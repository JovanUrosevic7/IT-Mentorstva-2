
async function page({ params }) {

    const resolvedParams = await params


    const response = await fetch("https://dummyjson.com/products/" + resolvedParams.slug)
    const data = await response.json()
    console.log(data);
    

    return (
        <div>
            <h1>{data.title}</h1>

            {data.images.map(image => (
                <img key={image} src={image} alt="" width={150} height={100} />
            ))}

        </div>
    )
}

export default page