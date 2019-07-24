import React from 'react'

function Login({loginHandler}) {
  return (
    <div id="loginForm">
      <form onSubmit={loginHandler}>
        <h1>Kirjaudu sisään</h1>
        <input name="name" placeholder="Käyttäjänimi" required />
        <input name="pass" placeholder="Salasana" type="password" required />
        <button>Kirjaudu</button>
      </form>
    </div>
  )
}

export default Login
