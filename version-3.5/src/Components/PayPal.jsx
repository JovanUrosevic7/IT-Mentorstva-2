import { useContext } from "react"
import { AmountContext, CurrencyContext} from "../App"

function PayPal() {

    const currency = useContext(CurrencyContext)
    const amount = useContext(AmountContext)
    console.log(currency, amount);
    
    

    return (
    <div>PayPal</div>
  )
}

export default PayPal