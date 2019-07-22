import React from 'react'

function Login({loginHandler}) {
  return (
    <div id="loginForm">
      <form onSubmit={loginHandler}>
        <h3>Kirjaudu sisään</h3>
        <input name="name" placeholder="Käyttäjänimi" required />
        <input name="pass" placeholder="Salasana" type="password" required />
        <button>Kirjaudu</button>
      </form>
    </div>
  )
}

export default Login
