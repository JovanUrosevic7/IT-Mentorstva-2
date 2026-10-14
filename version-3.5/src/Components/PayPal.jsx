import { useContext } from "react"
import { AmountContext, CurrencyContext} from "../App"
import { CURRENCIES } from "../Utils/CurrencyUtil"

function PayPal() {

    const currency = useContext(CurrencyContext)
    const amount = useContext(AmountContext)
    
    let multiply = CURRENCIES[currency.currency] * amount.amount

    return (
    <div>
        PayPal

        <p>{CURRENCIES[currency.currency]} * {amount.amount} = {multiply} RSD </p>
    </div>
  )
}

export default PayPal