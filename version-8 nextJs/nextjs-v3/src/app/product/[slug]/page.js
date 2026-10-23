import React from 'react'

async function slug({params}) {

    const urlPrarams = await params

    const response = await fetch(process.env.PRODUCT_API_URL + "products/" + urlPrarams.slug)
    const data = await response.json()
    console.log(response);
    console.log(data);

    if(response.status === 404) return <h1>Ne postoji</h1>  
    
    
  return (
    <div>
        <div>
            <p>{data.title}</p>
            <p>Description: {data.description}</p>
            <p>Price: {data.price}</p>
        </div>

    </div>
  )
}

export default slug