import AllVideos from "./Components/AllVideos"
import {BrowserRouter, Route, Routes} from "react-router-dom"

function App() {


  

  return (
    <div className="m-4">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllVideos />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
