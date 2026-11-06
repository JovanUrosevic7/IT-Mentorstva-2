import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import CartProvider from "./context/CartContext"
import { CurrencyProvider } from "./context/CurrencyContext"
import NavigationBar from "./components/NavigationBar"
import CartPage from "./pages/CartPage"

function App() {
  return (
    <CurrencyProvider>
      <CartProvider>
        <BrowserRouter>
          
          <NavigationBar />

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
        
        </BrowserRouter>
      </CartProvider>
    </CurrencyProvider>
  )
}

export default App