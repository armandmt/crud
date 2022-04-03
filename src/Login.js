import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './UserContext'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { createUserWithEmailAndPassword } from "firebase/auth";


const Login = () => {

 const estat = useContext(UserContext)
 const { usuari, setUsuari } = estat
 const [ nom,setNom ] = useState("")
 const [ passwd, setPasswd] = useState("")

 const [login, setLogin] = useState(true)

  const navegar = useNavigate()

  const handleForm = (e) => {

     e.preventDefault()
     const auth = getAuth();


     if (login)
     {
        console.log("Fent login...")

        signInWithEmailAndPassword(auth, nom, passwd)
            .then((userCredential) => {
               // Signed in
               const user = userCredential.user;
               setUsuari(user.email)
               console.log(user)
               navegar("/home")
               // ...
            })
            .catch((error) => {
               const errorCode = error.code;
               const errorMessage = error.message;
               console.log(errorMessage)
            });
        


     }
     else
     {

      console.log(nom)
      console.log(passwd)
      createUserWithEmailAndPassword(auth, nom, passwd)
            .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user)
            setUsuari(user)
            // ...
  })
            .catch((error) => {
               const errorCode = error.code;
               const errorMessage = error.message;
    // ..
  });





     }


     
      
  }

  return (
    
   <div className="container">
   { login  ? (
   
    <div className="row text-center login-page">
   <div className="col-md-12 login-form">
      <form > 			
         <div className="row">
        <div className="col-md-12 login-form-header">
           <div className="login-form-font-header">Fer <span>Login</span></div>
        </div>
    </div>
    <div className="row mt-3">
       <div className="col-md-12 login-from-row">
          <input 
          onChange={ (e)=> setNom (e.target.value) } 
          value = { nom }  
          name="usuario"
           type="email" 
          placeholder="Usuari" />
       </div>
    </div>
    <div className="row mt-3">
       <div className="col-md-12 login-from-row">
          <input 
          onChange={ (e)=> setPasswd (e.target.value) } 
          value = { passwd }  
          name="password" type="password" placeholder="Contrasenya" />
       </div>
    </div>
    <div className="row">
       <div className="col-md-12 login-from-row  mt-5">
          <button onClick={ handleForm } className="btn btn-info btn-sm">Login</button>
          <button onClick={ (e)=> { e.preventDefault(); setLogin(false) }} className="btn btn-link">Registrar</button>

       </div>
    </div>
    </form>
</div>
 </div>
 ) : (
 <div className="row text-center login-page">
   <div className="col-md-12 login-form">
      <form > 			
         <div className="row">
        <div className="col-md-12 login-form-header">
           <div className="login-form-font-header">Fer <span>Registre</span></div>
        </div>
    </div>
    <div className="row mt-3 ">
       <div className="col-md-12 login-from-row">
          <input 
          onChange={ (e)=> setNom (e.target.value) } 
          value = { nom }  
          name="usuario"
           type="email" 
          placeholder="Usuari" />
       </div>
    </div>
    <div className="row mt-3">
       <div className="col-md-12 login-from-row">
          <input 
           onChange={ (e)=> setPasswd (e.target.value) } 
           value = { passwd }  
          name="password" type="password" placeholder="Contrasenya" />
       </div>
       
    </div>
    <div className="row">
       <div className="col-md-12 login-from-row mt-5">
          <button onClick={ handleForm } className="btn btn-info btn-sm ">Registrar</button>
          <button onClick={ (e)=> { e.preventDefault(); setLogin(true) }} className="btn btn-link">Login</button>
          
       </div>
    </div>
    </form>
</div>
 </div> )}
</div>
  )
}

export default Login