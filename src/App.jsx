import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Crud from './pages/crud.jsx'
import Login from './pages/login.jsx'
import { HashRouter, Routes, Route } from "react-router-dom"; // Cambiado a HashRouter

function App() {
  const [count, setCount] = useState(0)

  return (
    <HashRouter> {/* Cambiado a HashRouter */}
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Home" element={<Crud />} /> 
    </Routes>
  </HashRouter>
  )
}

export default App
