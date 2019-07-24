import React from 'react'

function User({user, handleUserNameChange, handleUserPassChange, delUser}) {
  if(!user) {
    return <p>Et ole kirjautunut sisään</p>
  }

  return (
    <div id="user">
      <h1>Hei {user.username}</h1>
      
      <form onSubmit={handleUserNameChange}>
        <p><b>Vaihda käyttäjänimeä</b></p>
        <input placeholder="Käyttäjänimi" name="username" required />
        <button>Lähetä</button>        
      </form>

      <form onSubmit={handleUserPassChange}>
        <p><b>Vaihda salasana</b></p>
        <input placeholder="Vanha salasana" name="oldPass" type="password" required />
        <input placeholder="Uusi salasana" name="newPass" type="password" required />
        <button>Lähetä</button>
      </form>

      <button id="del" onClick={delUser}>Poista käyttäjä</button>
    </div>
  )
}

export default User