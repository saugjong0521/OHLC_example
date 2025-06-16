import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Chart from './components/Chart'

function App() {

  return (
    
    <div className="flex w-screen h-screen items-center justify-center">
      <div className="w-[900px] h-[400px]">
        <Chart />
      </div>
    </div>

  )
}

export default App
