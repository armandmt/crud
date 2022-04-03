import React, { useState } from 'react'
import {  Route, Routes } from 'react-router-dom';
import Menu from './Menu';
import Login from './Login';
import About from './About';
import Home from './Home'
import { UserContext } from './UserContext';


const App = () => {


  const state = useState("")

  const [ usuari, setUsuari ] = state

  return (

    <UserContext.Provider value= {{ usuari,setUsuari } }>
    <Routes>
        <Route path="/" element={ <Menu  />}>
            <Route index element= {  usuari != "" ? <Home  /> : <Login/>} />
            <Route path="about" element= {<About/>} />
            <Route path="login" element= {<Login />} />
            <Route path="*" element= {<Home/>} />
        </Route>
    </Routes>
    </UserContext.Provider>
  )
}

export default App