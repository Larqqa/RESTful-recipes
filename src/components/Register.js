import React from 'react'

function Register({registerHandler}) {
  return (
    <div id="registerForm">
      <form onSubmit={registerHandler}>
        <h1>Rekisteröidy</h1>
        <input name="name" placeholder="Käyttäjänimi" required />
        <input name="pass" placeholder="Salasana" type="password" required />
        <button>Rekisteröidy</button>
      </form>
    </div>
  )
}

export default Register