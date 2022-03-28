import React from 'react'
import { Link, Outlet } from 'react-router-dom'


const Menu = () => {


  return (
    <>
    
    <nav className="navbar navbar-light bg-light justify-content-center">
    <ul className="nav navbar-light justify-content-center">
    <li className="nav-item">
      <Link to="/" className="nav-link active">App</Link> 
    </li>
    <li className="nav-item">
    <Link to="/about" className="nav-link" >About</Link>
    </li>
    <li className="nav-item">
      <Link to="/login" className="nav-link">Login</Link>
    </li>
   
  
</ul>
</nav>

<Outlet/>
 
    </>
  )
}

export default Menu