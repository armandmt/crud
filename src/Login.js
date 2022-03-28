import React from 'react'

const Login = () => {
  return (
    <div class="container">
    <div class="row text-center login-page">
   <div class="col-md-12 login-form">
      <form > 			
         <div class="row">
        <div class="col-md-12 login-form-header">
           <div class="login-form-font-header">J<span>Suite</span></div>
        </div>
    </div>
    <div class="row">
       <div class="col-md-12 login-from-row">
          <input name="usuario" type="text" placeholder="Usuari" required/>
       </div>
    </div>
    <div class="row">
       <div class="col-md-12 login-from-row">
          <input name="password" type="password" placeholder="Contrasenya" required/>
       </div>
    </div>
    <div class="row">
       <div class="col-md-12 login-from-row">
          <button class="btn btn-info">Entrar</button>
       </div>
    </div>
    </form>
</div>
 </div>
</div>
  )
}

export default Login