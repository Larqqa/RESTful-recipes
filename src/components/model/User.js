import React from 'react'

function User({user, handleUserChange, delUser}) {
  if(!user) return <div id="user"></div>
  return (
    <div id="user">
      <div className="user--wrapper">
        <h1>Hei {user.username}</h1>
        <form onSubmit={handleUserChange}>
          <p><b>Vaihda käyttäjänimeä</b></p>
          <input placeholder="Käyttäjänimi" name="username" />
          <p><b>Vaihda sähköposti</b></p>
          <input placeholder="Sähköposti" name="email" />
          <p><b>Vaihda salasana</b></p>
          <input placeholder="Vanha salasana" name="oldPass" />
          <input placeholder="Uusi salasana" name="newPass" />
          <button>Lähetä</button>
        </form>
        <button onClick={delUser}>Poista käyttäjä</button>
      </div>
    </div>
  )
}

export default User