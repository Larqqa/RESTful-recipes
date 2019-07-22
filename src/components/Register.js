import React from 'react'

function Register({registerHandler}) {
  return (
    <div id="registrationForm">
      <form onSubmit={registerHandler}>
        <h3>Rekisteröidy</h3>
        <input name="name" placeholder="Käyttäjänimi" required />
        <input name="pass" placeholder="Salasana" type="password" required />
        <button>Rekisteröidy</button>
      </form>
    </div>
  )
}

export default Register