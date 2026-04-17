import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

//import './css/App.css'
import '../css/index.css'
import Home from '../Pages/Home.jsx'
import Catalog from '../Pages/Catalog.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
      <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/movies" element={<Catalog/>} />
            </Routes>
        </BrowserRouter>
      </>
  );
}
export default App;
