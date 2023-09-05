import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Booking from'./Booking'
import Confirmation from './Confirmation'
function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}></Route>
        <Route path='/register' element={<Signup/>}></Route>
        <Route path='/login/' element={<Login/>}></Route>
        <Route path='/home/:email' element={<Home/>}></Route>
        <Route path='/booking/:id/:email' element={<Booking/>}></Route>
        <Route path='/confirmation/:id' element={<Confirmation/>}></Route>

      </Routes>
      </BrowserRouter>
  )
}

export default App
