import React from 'react'
import Recipe from './subComponents/SingleRecipe'

function MyRecipes({user, recipes, handleOpen, cat, handleChange, group, addArrays, handleGroup}) {
  if(!user) return <p>Et ole kirjautunut sisään</p>
  
  return (
    <div id="myRecipes">
      <h1>Minun reseptit:</h1>
      <select name="myRecipesCategory" onChange={handleChange}>
        {cat.map((cat, i) => <option key={i} value={cat.toLowerCase()}>{cat}</option>)}
      </select>
      <ul id="group">
        {group.map(opt => {
          const index = addArrays.group.indexOf(opt.toLowerCase())
          if(index >= 0) {
            return <li key={opt}><label><input type="checkbox" name='recipes' onChange={handleGroup} value={opt.toLowerCase()} checked={true} />{opt}</label></li>
          }

          return <li key={opt}><label><input type="checkbox" name='recipes' onChange={handleGroup} value={opt.toLowerCase()} checked={false} />{opt}</label></li>
        })}
      </ul>
      {recipes && recipes.length > 0 ? recipes.map((recipe, i) => <Recipe key={i} recipe={recipe} handleOpen={handleOpen} dest={'myRecipes'} />) : <p>Ei vielä omia reseptejä</p>}
    </div>
  )
}

export default MyRecipes
