import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../css/index.css'
import Home from '../Pages/Home.jsx'
import Catalog from '../Pages/Catalog.jsx'
import Genres from '../Pages/Genres.jsx'
import SearchResults from '../Pages/SearchResults.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App
