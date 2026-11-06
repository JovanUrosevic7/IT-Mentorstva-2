import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useCurrency } from "../context/CurrencyContext"

function NavigationBar() {

    const {totalItems} = useCart()
    const {currency, setCurrency} = useCurrency()

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                
                {/* Logo / Početna strana */}
                <Link to="/" className="text-xl font-extrabold text-blue-600 hover:text-blue-700 transition-colors">
                    🛒 DummyShop
                </Link>

                {/* Desna strana: Valuta i Korpa */}
                <div className="flex items-center space-x-4">
                    
                    {/* Selektor valute */}
                    <div className="flex items-center space-x-1">
                        <select 
                            value={currency} 
                            onChange={(e) => setCurrency(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-pointer"
                        >
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="RSD">RSD</option>
                        </select>
                    </div>

                    {/* Link ka korpi sa brojačem stavki */}
                    <Link 
                        to="/cart" 
                        className="relative bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center space-x-2"
                    >
                        <span>🛒 Korpa</span>
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                </div>
            </div>
        </nav>
  )
}

export default NavigationBar