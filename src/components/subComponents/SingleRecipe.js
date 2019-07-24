import React from 'react'

function SingleRecipe({recipe, handleOpen, dest, clearAddArrays}) {
  return (
    <div>
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      <button onClick={(e) => {handleOpen(e); clearAddArrays(e)}} value={`${recipe.id}:${dest}`} >Avaa</button>
    </div>
  )
}

export default SingleRecipe
