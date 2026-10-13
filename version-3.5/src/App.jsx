import { createContext, useState } from "react"
import Payment from "./Components/Payment"


export const CurrencyContext = createContext("USD")
export const AmountContext = createContext(0)

// 10.18 predavanje 

function App() {

  const [currency, setCurrency] = useState("USD")
  const [amount, setAmount] = useState(0)

  const updateCurrency = () => {
    setCurrency("EURO")
  }

  const updateAmount = (amountValue) => {
    setAmount(amountValue)
    console.log(amount);
    
  }

  return (
    <div>
  
      This is app
  
      <CurrencyContext.Provider value={{currency, updateCurrency, AmountContext}}>
        <Payment />
        <button onClick={updateCurrency}>Update currency</button>

        <input type="text" onInput={(e) => updateAmount(e.currentTarget.value)}/>
      </CurrencyContext.Provider>

    </div>
  )
}

export default App