

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

// https://dummyjson.com/products/search?pretraga=phone

export async function searchProductByQuery(query){
    const response = await fetch(process.env.PRODUCT_API_URL + "products/search?q=" + query)
    return await response.json()
    // console.log(query);
    
}

export function addProduct(title, description, price) {
    fetch(process.env.PRODUCT_API_URL + "products/add", {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({
            title: title,
            desctiption: description,
            price: price
        })
    })
    .then(response => response.json())
    .then(console.log)

}



export function loginUser(username, password){
    fetch(process.env.PRODUCT_API_URL + "auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(res => res.json())
    .then(console.log)
}