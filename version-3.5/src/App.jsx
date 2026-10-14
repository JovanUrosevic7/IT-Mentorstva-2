import { createContext, useState } from "react"
import Payment from "./Components/Payment"
import { CURRENCIES } from "./Utils/CurrencyUtil"


export const CurrencyContext = createContext("USD")
export const AmountContext = createContext(0)

// 10.18 predavanje 

function App() {

  const [currency, setCurrency] = useState("USD")
  const [amount, setAmount] = useState(0)

  const updateCurrency = (valute) => {
    setCurrency(valute)
  }

  const updateAmount = (amountValue) => {
    setAmount(amountValue)    
  }

  const exchangeMoney = () => {

    console.log(currency, amount);
    

    // if(chooseValute.trim() == "" && amount.trim() == "" ) return
    // console.log(parseInt(chooseValute) * parseInt(amount));

  }

  return (
    <div>
  
      App
  
      <CurrencyContext.Provider value={{ currency, updateCurrency }}>
        <AmountContext.Provider value={{ amount, updateAmount }}>
          
          <Payment />

        </AmountContext.Provider>
      </CurrencyContext.Provider>

      {/* <button onClick={updateCurrency}>Update currency</button> */}

      <input type="text" placeholder="Amount" onInput={(e) => updateAmount(e.target.value)}/>

      <select name="" id="" onChange={(e) => updateCurrency(e.target.value)}>
        {Object.keys(CURRENCIES).map(currency => (
          <option key={currency} value={currency}>{currency}</option> 
        ))}  
      </select>  

      <button type="button" onClick={exchangeMoney}>Exchange money in RSD</button>

    </div>
  )
}

export default App