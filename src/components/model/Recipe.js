import React from 'react'

function Recipe({recipe, goTo, goToEdit, dest, user}) {
  if(!recipe) return <></>

  return (
    <div id="recipe">
      <div>
        <button onClick={goTo} value={dest} >Takaisin</button>
        {user && user.id === recipe.userID ? <button onClick={goToEdit} value={`${recipe.id}:addRecipe`}>Muokkaa</button> : false}
        <h3>{recipe.title}</h3>
        <p>- {recipe.category} -</p>
        <p>{recipe.description}</p>
        <p><b>Ainekset:</b></p>
        <ul>
          {recipe.ingredients.map((ingredient, i) => <li key={i}><input type="checkbox" /> {ingredient}</li>)}
        </ul>
        <p><b>Valmistus:</b></p>
        <ol>
          {recipe.steps.map((steps, i) => <li key={i}>{steps}</li>)}
        </ol>
        <p><b>Annoksia:</b> {recipe.servings} {recipe.servings > 1 ? "lautasellista" : "lautasellinen"}</p>
        <p><b>Valmistuksen kesto:</b> n. {recipe.timeToMake} {recipe.timeToMake > 1 ? "tuntia" : "tunti"}</p>
      </div>
    </div>
  );
}

export default Recipe
