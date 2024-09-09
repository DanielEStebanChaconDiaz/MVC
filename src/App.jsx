import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './pages/button.jsx'
import Find from './pages/findName.jsx'
import Eliminar from './pages/eliminar.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Find/>
      <Button/>
      <Eliminar/>
    </>
  )
}

export default App
