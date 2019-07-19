import React from 'react'
import recipesService from '../../services/recipes'

function Recipe({recipe, goTo, goToEdit, dest, user, delRecipe, match, setRecipe, Link}) {
  if(!recipe) {
    console.log(match.params.id)
    recipesService
    .getOneByTitle(match.params.id.replace('_', ' '))
    .then(recipe => {
      setRecipe(recipe)
    })
    return <></>
  }

  return (
    <div id="recipe">
      <div>
        {dest !== '/' ? <Link to={`/${dest}`}><button>Takaisin</button></Link> : <Link to='/' ><button>Etusivulle</button></Link>}
        {user && user.id === recipe.userID ?
          <>
          <Link to={`/editRecipe/${recipe.id}`} ><button>Muokkaa</button></Link>
          <button onClick={delRecipe} value={`${recipe.id}`}>Poista</button>
          </>
        : false}
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
