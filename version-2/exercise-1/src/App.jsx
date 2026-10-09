import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./Pages/Home"
import TempVideo from "./Components/TempVideo"

function App() {


  

  return (
    <div className="m-4">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<TempVideo />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App


