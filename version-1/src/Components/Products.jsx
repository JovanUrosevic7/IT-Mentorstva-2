import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"



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
    let [infoMesage, setInfoMessage] = useState()

    const addProduct = () => {

        if(newProductName === "" || newProductPrice === "") return

        let newProduct = {[newProductName]: newProductPrice}

        setProducts(currentProducts => ({
            ...currentProducts,
            ...newProduct
        }))
        
    }

    
    let keys = Object.keys(products)
    const searchProduct = (e) => {
        let searchedProduct = e.target.value 
        
        if(keys.find(p => p.toLocaleLowerCase() === searchedProduct.toLocaleLowerCase())){
            setInfoMessage("Uspesno ste pronasli proizovd")
            
        }else{
            setInfoMessage("Ne postoji trazeni proizvod");
            
        }

    }

    tax = parseInt(tax)
    
    return (

        <div className="">
            
            <div className="d-flex justify-content-start">

                <div>
                    <p>Product name:</p>
                    <input type="text" onChange={(e) => setNewProductName(e.target.value)} />
                    
                    <p>Product price:</p>
                    <input type="number" onChange={(e) => setNewProductPrice(e.target.value)} />
                    <br />
                    <br />
                    <button onClick={addProduct}>Create new product</button>
                </div>

                <div className="m-5">

                    {Object.entries(products).map(([phone, price]) => {
                        return <p>{phone} - ${price}, with tax: ${CalculateTax(price, tax)}</p>
                    })}
                </div>
                
                <div className="d-flex flex-column justify-content-center gap-3 ">

                    <input type="text" name="" id="" onChange={searchProduct} placeholder="Pretrazite proizvod" style={{display:"block", marginTop:"10px", marginBottom:"10px"}}/>
                    <p>{infoMesage}</p>

                    <button onClick={() => setProducts({})}>Delete All Products</button>
                    
                </div>

            </div>

        </div>
  

    )
}



function CalculateTax(priceProducts, taxProduct){

    return priceProducts * ((100 +  taxProduct) / 100 )

}



export default Products