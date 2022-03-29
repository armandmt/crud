import React, { useState } from 'react'
import {  Route, Routes } from 'react-router-dom';
import Menu from './Menu';
import Login from './Login';
import About from './About';
import Home from './Home'


const App = () => {


  const state = useState("armand")

  return (
   
    <Routes>
        <Route path="/" element={ <Menu estat={state} />}>
            <Route index element= {<Home estat= { state } />} />
            <Route path="about" element= {<About/>} />
            <Route path="login" element= {<Login estat = { state } />} />
            <Route path="*" element= {<Home/>} />
        </Route>
    </Routes>
  )
}

export default App