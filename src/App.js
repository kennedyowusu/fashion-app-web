import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import Home from './pages/home/Home';

function App() {
  return (
    <div className='w-full'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  )
}

export default App;
