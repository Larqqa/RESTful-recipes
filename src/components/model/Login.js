import React from 'react'

function Login({loginHandler}) {
  return (
    <div id="loginForm">
      <form onSubmit={loginHandler}>
        <h3>Kirjaudu sisään</h3>
        <input placeholder="Käyttäjänimi" />
        <input placeholder="Salasana" type="password" />
        <button>Kirjaudu</button>
      </form>
    </div>
  )
}

export default Login
