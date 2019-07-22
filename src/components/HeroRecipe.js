import React from 'react'

const HeroRecipe = ({recipe, font, handleOpen, handleChange, cat, changeFilter, user}) => {

  return (
    <div id="hero">
        <div className="hero__nav">
          <button value="rand" onClick={changeFilter} className={user ? '' : 'noUser'}>Satunnainen</button>
          {user ? <button value="ownRand" onClick={changeFilter}>Oma resepti</button> : false }
          <select name="category" onChange={changeFilter}>
            {cat.map((cat, i) => <option key={i} value={cat.toLowerCase()}>{cat}</option>)}
          </select>
        </div>
        {recipe ?
          <>
          <h1 style={{fontFamily: font, fontSize: `${recipe.title && recipe.title.length < 10 ? 12 : 8 }rem`}} >{recipe.title}</h1>
          <p>{recipe.description}</p>
          <div className="hero__buttons">
            <button value={`${recipe.id}:/`} onClick={handleOpen}>Avaa</button>
            <button onClick={handleChange}>Vaihda</button>
          </div>
          </>
          :
          <h1>Ei reseptejä</h1>
        }
    </div>
  )
}

export default HeroRecipe