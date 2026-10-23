

export async function getAllProducts(limit=9) {

    const response = await fetch(process.env.PRODUCT_API_URL + "products?limit=" + limit)
    return await response.json()


}

export default getAllProducts



