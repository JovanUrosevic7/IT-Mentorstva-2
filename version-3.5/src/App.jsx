import { createContext, useEffect, useReducer, useState } from "react"
import Payment from "./Components/Payment"
import { CURRENCIES } from "./Utils/CurrencyUtil"
import { initialUserState, loadUserState, userReducer } from "./Reducer/User"


export const CurrencyContext = createContext("USD")
export const AmountContext = createContext(0)

// 11.19 predavanje 

function App() {

  const [userState, dispatch] = useReducer(userReducer, loadUserState())

  const [currency, setCurrency] = useState("USD")
  const [amount, setAmount] = useState(0)
  const [username, setUsername] = useState(null)
  const [money, setMoney] = useState(null)
  const [isUserCreated, setIsUserCreated] = useState(false)


  const updateCurrency = (valute) => {
    setCurrency(valute)
  }

  const updateAmount = (amountValue) => {
    setAmount(amountValue)
  }

  const saveUser = () => {
    if (!userState.username || userState.username.trim() === "" || isNaN(userState.money) || userState.money === null) return

    console.log(userState.username, userState.money);
    dispatch({type: "SET_ISUSERCREATED",payload: true})

  }

  useEffect(() => {
    if(userState.isUserCreated){
      localStorage.setItem("userCreated", JSON.stringify(userState))
    }
  }, [userState])

  return (
    <div>

      App

      <CurrencyContext.Provider value={{ currency, updateCurrency }}>
        <AmountContext.Provider value={{ amount, updateAmount }}>

          <Payment />

        </AmountContext.Provider>
      </CurrencyContext.Provider>

      {/* <button onClick={updateCurrency}>Update currency</button> */}

      <input type="text" placeholder="Amount" onInput={(e) => updateAmount(e.target.value)} />

      {!userState.isUserCreated && (

        <form action="">
          <input type="text" placeholder="Enter username" onInput={(e) => dispatch({type: "SET_USERNAME",payload: e.target.value})} />
          <input type="text" placeholder="Enter money" onInput={(e) => dispatch({type: "SET_MONEY",payload: Number(e.target.value)})} />
          <button type="button" onClick={saveUser}>Create User</button>
        </form>
      )}

      <select name="" id="" onChange={(e) => updateCurrency(e.target.value)}>
        {Object.keys(CURRENCIES).map(currency => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>

      {/* <button type="button" onClick={exchangeMoney}>Exchange money in RSD</button> */}

    </div>
  )
}

export default App