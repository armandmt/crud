import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { UserContext } from './UserContext'


const Menu = () => {


  const estat = useContext(UserContext)
  const { usuari, setUsuari } = estat
 

  return (
    <>
    
    <nav className="navbar navbar-light bg-light justify-content-center">
    <ul className="nav navbar-light justify-content-center">
    <li className="nav-item">
      <Link to="/" className="nav-link active">Home</Link> 
    </li>
    <li className="nav-item">
    <Link to="/about" className="nav-link" >About</Link>
    </li>
    <li className="nav-item">
      <Link to="/login" className="nav-link">Login</Link>
    </li>
    <li className="nav-link">
      { usuari }
    </li>
   
   
  
</ul>

</nav>

<Outlet/>
 
    </>
  )
}

export default Menu