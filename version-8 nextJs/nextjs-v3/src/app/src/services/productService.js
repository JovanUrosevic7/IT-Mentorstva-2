

export async function getAllProducts(limit=9) {

    const response = await fetch(process.env.PRODUCT_API_URL + "products?limit=" + limit, {
        next: {
            revalidate: 3600
        }
    })
    return await response.json()


}

export async function getProductById(productId=1){

    const response = await fetch(process.env.PRODUCT_API_URL + "products/" + productId)
    
    if(response.status === 404) return false 
    
    return await response.json()
}



