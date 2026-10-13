import { useContext } from "react"
import { CurrenyContext } from "../App"

function PayPal() {

    const currency = useContext(CurrenyContext)
    console.log(currency);
    


    return (
    <div>PayPal</div>
  )
}

export default PayPal