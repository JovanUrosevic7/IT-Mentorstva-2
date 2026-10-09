import "./style.css"
import favIcon from "../public/favicon.svg"
import Products from "./Components/Products"
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"




const btnElement = () => {
  console.log("works");
  
}

function App() {
  
  const [btnName, setBtnName] = useState("Dugme")
  const [productTax, setProductTax] = useState(0)

 

  

  return (

    <div>

      <Products tax={productTax}/>
      
      <button onClick={btnElement} className="btn btn-primary">{btnName}</button>

      <input type="text" name="" id="" onChange={(e) => setBtnName(e.target.value)} />

      <p>Unesi taksu: </p>
      <input type="text" name="" id="" onInput={(e) => setProductTax(e.target.value)} />
      {/* <button onClick={enterTax}>Enter Tax</button> */}

    </div>
  
  )
}

export default App