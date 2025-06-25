import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
const App = () => {
  return (
    <div >
   <Routes>
    <Route path='/' element={<Home/>} />
     <Route path='/login' element={<Login/>} />
      <Route path='/email-verify'  element={<Home/>}/>
       <Route path='/reset-password' element={<Home/>} />
   </Routes>
    </div>
  )
}

export default App
