import React from 'react'

function Navigation({Link, handleLogout, user, clearEdit}) {
  return (
    <div className="nav">
      <div>
        <Link to='/'>Etusivu</Link>
        <Link to='Recipes'>Reseptejä</Link>
      </div>
      <div className="navWrap">
        {user ?
          <>
          <p>Hei {user.username}</p>
          <Link to='AddRecipe' onClick={clearEdit}>Lisää resepti</Link>
          <Link to='User'>Käyttäjätili</Link>
          <Link to='MyRecipes'>Minun reseptit</Link>
          <Link onClick={handleLogout} to='/'>Kirjaudu ulos</Link>
          
          </>
          :
          <>
          <Link to='Login'>Kirjaudu sisään</Link>
          <Link to='Register'>Rekisteröidy</Link>
          </>
        }
      </div>
    </div>
  )
}

export default Navigation