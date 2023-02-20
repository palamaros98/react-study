import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {UseStateBasics} from "./hello-world/HelloWorld";

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log(count)
  }, [])

  return (
    <UseStateBasics/>
  )
}

export default App
