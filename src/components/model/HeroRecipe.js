import React from 'react'

const HeroRecipe = ({recipe, font, handleOpen, handleChange}) => {

  if(!recipe) return <></>
  return (
    <div className="hero" id="hero" style={{opacity:1, pointerEvents: 'all'}}>
      <div>
        <h1 style={{fontFamily: font, fontSize: `${recipe.title && recipe.title.length < 10 ? 12 : 8 }rem`}} >{recipe.title}</h1>
        <p>{recipe.description}</p>
        <button value={`${recipe.id}:/`} onClick={handleOpen}>Avaa</button>
        <button onClick={handleChange}>Vaihda</button>
      </div>
    </div>
  )
}

export default HeroRecipe