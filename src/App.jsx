import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

import './css/App.css'
import './css/index.css'
import Home from './Pages/Home.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (

    <Home/>

  );
}

export default App
