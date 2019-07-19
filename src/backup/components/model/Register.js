import React from 'react'

function Register({registerHandler}) {
  return (
    <div id="registrationForm">
      <form onSubmit={registerHandler}>
        <h3>Rekisteröidy</h3>
        <input placeholder="Käyttäjänimi" />
        <input placeholder="Sähköposti" />
        <input placeholder="Salasana" type="password"  />
        <button>Rekisteröidy</button>
      </form>
    </div>
  )
}

export default Register