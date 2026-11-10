import { createContext, useContext, useState } from "react"


const CurrencyContext = createContext()

const RATES = {
    USD: { symbol: "$", rate: 1 },
    EUR: { symbol: "€", rate: 0.92 },
    RSD: { symbol: "RSD", rate: 108 }
}

export function CurrencyProvider({ children }) {

    const [currency, setCurrency] = useState("USD")

    const formatPrice = (priceInUSD) => {

        const target = RATES[currency]
        const converted = (priceInUSD * target.rate).toFixed(2)
        return currency === "RSD" ? `${converted} ${target.symbol}` : `${target.symbol}${converted}`

    }

    return (
        <CurrencyContext.Provider value={{currency, setCurrency, formatPrice}}>
            {children}
        </CurrencyContext.Provider>
    )
}

export const useCurrency = () => useContext(CurrencyContext);