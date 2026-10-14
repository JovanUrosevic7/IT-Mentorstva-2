import Login from "./Pages/Login"
import {BrowserRouter, Route, Routes} from "react-router"


function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App