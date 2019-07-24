import React from 'react'
import recipesService from '../services/recipes'

function Recipe({recipe, dest, user, delRecipe, match, setRecipe, Link, setEditable}) {
  // Reset edit form
  setEditable('')

  // if no recipe, for example page refresh, parse title from url and fetch recipe with title
  if(!recipe) {
    recipesService.getOneByTitle(match.params.id.replace('_', ' '))
    .then(recipe => {
      setRecipe(recipe)
    })
    
    // "re-render"
    return <></>
  }

  return (
    <div id="recipe">
      <div className="recipe__nav">
        <Link to={dest !== '/' && dest ? `/${dest}` : '/'} id="back"><button>{dest !== '/' && dest ? 'Takaisin' : 'Etusivulle'}</button></Link>
        {user && user.id === recipe.userID ?
            <>
            <Link to={`/editRecipe/${recipe.id}`} ><button>Muokkaa</button></Link>
            <button onClick={delRecipe} value={`${recipe.id}`}>Poista</button>
            </>
        : false}
      </div>
      <h1>{recipe.title}</h1>
      <p>- {recipe.category} -</p>
      {recipe.group.length > 0 ? <p>{recipe.group.map((group, i) => i === 0 && group ? `- ${group}  - ` : `${group}  - `)}</p> : null}
      <p>{recipe.description}</p>
      <p><b>Ainekset:</b></p>
      <ul>
        {recipe.ingredients.map((ingredient, i) => <li key={i}><label><input type="checkbox" /> {ingredient}</label></li>)}
      </ul>
      <p><b>Valmistus:</b></p>
      <ol>
        {recipe.steps.map((steps, i) => <li key={i}>{steps}</li>)}
      </ol>
      {recipe.servings && recipe.servings !== 0 ? <p><b>Annoksia:</b> {recipe.servings} {recipe.servings > 1 ? "lautasellista" : "lautasellinen"}</p> : null}
      {recipe.timeToMake && recipe.timeToMake !== 0 ? <p><b>Valmistuksen kesto:</b> n. {`${recipe.timeToMake} minuuttia`}</p> : null}
    </div>
  )
}

export default Recipe
