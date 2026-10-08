import { useState } from "react"



function Products({tax}) {

    const [products, setProducts] = useState(
        {
            "Iphone 14": 1200, 
            "Iphone 15": 1300,
            "Samsung S23 Ultra": 1400
        }
    )
    let [newProductName, setNewProductName] = useState("")
    let [newProductPrice, setNewProductPrice] = useState("")

    const addProduct = () => {

        if(newProductName === "" || newProductPrice === "") return

        let newProduct = {[newProductName]: newProductPrice}

        setProducts(currentProducts => ({
            ...currentProducts,
            ...newProduct
        }))
        
    }

    tax = parseInt(tax)
    
    return (

        <>
            
            <div>
                <p>Product name:</p>
                <input type="text" onChange={(e) => setNewProductName(e.target.value)} />
                
                <p>Product price:</p>
                <input type="number" onChange={(e) => setNewProductPrice(e.target.value)} />
                <br />
                <br />
                <button onClick={addProduct}>Create new product</button>
            </div>

           {Object.entries(products).map(([phone, price]) => {
                return <p>{phone} - ${price}, with tax: ${CalculateTax(price, tax)}</p>
           })}
            <button onClick={() => setProducts({})}>Delete Products</button>


        </>
  

    )
}



function CalculateTax(priceProducts, taxProduct){

    return priceProducts * ((100 +  taxProduct) / 100 )

}



export default Products