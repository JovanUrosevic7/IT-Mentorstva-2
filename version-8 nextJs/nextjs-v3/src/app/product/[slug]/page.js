import SearchBar from '@/app/src/components/searchBar';
import { getProductById } from '@/app/src/services/productService';
import React from 'react'

async function slug({params}) {

    const urlPrarams = await params    
    const data = await getProductById(urlPrarams.slug)

    if(!data) return <h1>Ne postoji</h1>
    
    
  return (
    <div>
        <div style={{marginTop:"10px"}}>
            <p>{data.title}</p>
            <p>Description: {data.description}</p>
            <p>Price: {data.price}</p>
        </div>

    </div>
  )
}

export default slug

