import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../css/index.css'
import Home from '../Pages/Home.jsx'

import Catalog from '../Pages/Catalog.jsx'
import Genres from '../Pages/Genres.jsx'
import Login from '../Pages/Login.jsx'
import Register from '../Pages/Register.jsx'
import SearchResults from '../Pages/SearchResults.jsx'
import MovieDetails from '../Pages/MovieDetails.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/genre/:id" element={<Genres />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App
