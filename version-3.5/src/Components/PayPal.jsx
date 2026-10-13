import { useContext } from "react"
import { CurrencyContext} from "../App"

function PayPal() {

    const currency = useContext(CurrencyContext)
    console.log(currency);
    


    return (
    <div>PayPal</div>
  )
}

export default PayPal