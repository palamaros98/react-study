import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {HelloWorld, NewHelloWorld} from "./hello-world/HelloWorld";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelloWorld/>
    <NewHelloWorld/>
  </React.StrictMode>,
)
