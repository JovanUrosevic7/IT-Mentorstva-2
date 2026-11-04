import { BrowserRouter, Routes, Route } from "react-router-dom"
import FooterBar from "./components/FooterBar"
import Home from "./page/Home"
import NavigationBar from "./components/NavigationBar"

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        
        <NavigationBar />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        <FooterBar />

      </div>
    </BrowserRouter>
  )
}

export default App