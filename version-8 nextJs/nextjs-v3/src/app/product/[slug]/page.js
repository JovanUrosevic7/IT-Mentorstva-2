import { getProductById } from '@/app/src/services/productService';
import React from 'react'

async function slug({params}) {

    const urlPrarams = await params    
    const data = await getProductById(urlPrarams.slug)

    if(!data) return <h1>Ne postoji</h1>
    
    
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

