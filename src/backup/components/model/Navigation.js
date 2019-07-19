import React from 'react'

function Navigation({handleLogin, handleRegistration, handleFront, handleRecipes, handleUser, user, handleAddRecipe, handleLogout, handleMyRecipes}) {
  return (
    <div className="nav">
      <div>
        <a href="etusivu" onClick={handleFront}>Etusivu</a>
        <a href="reseptejä" onClick={handleRecipes}>Reseptejä</a>
      </div>
      <div className="navWrap">
        {user ?
          <>
          <p>Hei {user.username}</p>
          <a href="lisääResepti" onClick={handleAddRecipe}>Lisää resepti</a>
          <a href="käyttäjätili" onClick={handleUser}>Käyttäjätili</a>
          <a href="minunReseptit" onClick={handleMyRecipes}>Minun reseptit</a>
          <a href="kirjauduUlos" onClick={handleLogout}>Kirjaudu ulos</a>
          </>
          :
          <>
          <a href="kirjauduSisään" onClick={handleLogin}>Kirjaudu sisään</a>
          <a href="rekisteröidy" onClick={handleRegistration}>Rekisteröidy</a>
          </>
        }
      </div>
    </div>
  )
}

export default Navigation