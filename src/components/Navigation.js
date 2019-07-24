import React from 'react'

function Navigation({Link, handleLogout, user, clearEdit, hamburgerClick, clearAddArrays}) {
  return (
    <div id="nav">
      <div id="nav__main">
        <Link to='/' onClick={hamburgerClick} >Etusivu</Link>
        <Link to='/Recipes' onClick={(e)=>{clearAddArrays(e); hamburgerClick(e)}} >Reseptejä</Link>
      </div>
      <div id="nav__sub">
        {user ?
          <>
          <p>Hei {user.username}</p>
          <Link to='/AddRecipe' onClick={(e)=>{clearAddArrays(e); hamburgerClick(e)}} >Lisää resepti</Link>
          <Link to='/User' onClick={hamburgerClick} >Käyttäjätili</Link>
          <Link to='/MyRecipes' onClick={(e)=>{clearAddArrays(e); hamburgerClick(e)}} >Minun reseptit</Link>
          <Link onClick={(e)=>{handleLogout(e); hamburgerClick(e)}} to='/' >Kirjaudu ulos</Link>
          
          </>
          :
          <>
          <Link to='/Login' onClick={hamburgerClick} >Kirjaudu sisään</Link>
          <Link to='/Register' onClick={hamburgerClick} >Rekisteröidy</Link>
          </>
        }
      </div>
    </div>
  )
}

export default Navigation