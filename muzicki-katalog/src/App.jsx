import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AlbumDetails from './pages/AlbumDetails';
import NotFound from './pages/NotFound';
import ArtistPage from './pages/ArtistPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/album/:id" element={<AlbumDetails />} />
        <Route path="/artist/:name" element={<ArtistPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App