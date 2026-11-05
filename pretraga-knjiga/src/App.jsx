import { BrowserRouter, Routes, Route } from "react-router-dom"
import FooterBar from "./components/FooterBar"
import Home from "./page/Home"
import NavigationBar from "./components/NavigationBar"
import BookDetails from "./page/BookDetails"
import NotFound from "./page/NotFound"
import AuthorDetails from "./page/AuthorDetails"

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        
        <NavigationBar />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/author/:id" element={<AuthorDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <FooterBar />

      </div>
    </BrowserRouter>
  )
}

export default App