import React from 'react'

function SingleRecipe({recipe, handleOpen, dest}) {
  return (
    <div>
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      <button onClick={handleOpen} value={`${recipe.id}:${dest}`} >Avaa</button>
    </div>
  )
}

export default SingleRecipe
