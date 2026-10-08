import "./style.css"
import favIcon from "../public/favicon.svg"
import Products from "./Components/Products"
import { useState } from "react";





const btnElement = () => {
  console.log("works");
  
}

function App() {
  
  const [btnName, setBtnName] = useState("Dugme")
  const [productTax, setProductTax] = useState(0)

  function inputElement (e) {
    setBtnName(e.target.value)
  }

  function enterTax (e) {
    setProductTax(parseInt(e.target.value))
    console.log(typeof(productTax));
    
  }

  

  return (

    <div>

      <Products tax={productTax}/>
      
      <button onClick={btnElement}>{btnName}</button>

      <input type="text" name="" id="" onChange={inputElement} />

      <p>Unesi taksu: </p>
      <input type="text" name="" id="" onInput={enterTax} />
      {/* <button onClick={enterTax}>Enter Tax</button> */}

    </div>
  
  )
}

export default App