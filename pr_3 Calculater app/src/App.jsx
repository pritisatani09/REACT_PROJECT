import { useState } from 'react'
import Calculater from './Components/Calculater'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Calculater />
    </>
  )
}

export default App
