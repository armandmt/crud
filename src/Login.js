import React, { useState } from 'react'

const Login = ({ estat }) => {

  const [ usuari, setUsuari ] = estat
  const [ nom,setNom ] = useState("")
  
  const handleForm = (e) => {

     e.preventDefault()
      setUsuari(nom)
  }

  return (
    <div className="container">
    <div className="row text-center login-page">
   <div className="col-md-12 login-form">
      <form > 			
         <div className="row">
        <div className="col-md-12 login-form-header">
           <div className="login-form-font-header">Fer <span>Login</span></div>
        </div>
    </div>
    <div className="row">
       <div className="col-md-12 login-from-row">
          <input 
          onChange={ (e)=> setNom (e.target.value) } 
          value = { nom }  
          name="usuario"
           type="text" 
          placeholder="Usuari" required/>
       </div>
    </div>
    <div className="row">
       <div className="col-md-12 login-from-row">
          <input name="password" type="password" placeholder="Contrasenya" required/>
       </div>
    </div>
    <div className="row">
       <div className="col-md-12 login-from-row">
          <button onClick={ handleForm } className="btn btn-info">Entrar</button>
       </div>
    </div>
    </form>
</div>
 </div>
</div>
  )
}

export default Login