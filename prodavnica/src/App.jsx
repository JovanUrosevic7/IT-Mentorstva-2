import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import CartProvider from "./context/CartContext"
import { CurrencyProvider } from "./context/CurrencyContext"

function App() {
  return (
    <CurrencyProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </CurrencyProvider>
  )
}

export default App