import { createContext } from "react"
import Payment from "./Components/Payment"


export const CurrenyContext = createContext("USD")
console.log(CurrenyContext);


function App() {

  

  return (
    <div>
  
      This is app
  
      <CurrenyContext.Provider value="USD">
        <Payment />
      </CurrenyContext.Provider>

    </div>
  )
}

export default App