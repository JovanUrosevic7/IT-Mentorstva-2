import { createContext, useState } from "react"
import Payment from "./Components/Payment"


export const CurrencyContext = createContext("USD")
console.log(CurrencyContext);


function App() {

  const [currency, setCurrency] = useState("USD")

  const updateCurrency = () => {
    setCurrency("EURO")
  }

  return (
    <div>
  
      This is app
  
      <CurrencyContext.Provider value={{currency, updateCurrency}}>
        <Payment />
        <button onClick={updateCurrency}>Update currency</button>
      </CurrencyContext.Provider>

    </div>
  )
}

export default App