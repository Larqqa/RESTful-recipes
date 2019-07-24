import React from 'react'
import Recipe from './subComponents/SingleRecipe'

function MyRecipes({user, recipes, handleOpen, cat, handleChange, group, addArrays, handleGroup, clearAddArrays}) {
  if(!user) {
    return <p>Et ole kirjautunut sisään</p>
  }
  
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
            return <li key={opt}><input id={opt} type="checkbox" name='recipes' onChange={handleGroup} value={opt.toLowerCase()} checked={true} hidden /><label htmlFor={opt}>{opt}</label></li>
          }

          return <li key={opt}><input id={opt} type="checkbox" name='recipes' onChange={handleGroup} value={opt.toLowerCase()} checked={false} hidden /><label htmlFor={opt}>{opt}</label></li>
        })}
      </ul>
      <hr />
      {recipes && recipes.length > 0 ? recipes.map((recipe, i) => <><Recipe key={i} recipe={recipe} handleOpen={handleOpen} dest={'myRecipes'} clearAddArrays={clearAddArrays} />{i !== recipes.length - 1 ? <hr /> : null}</>) : <p>Reseptejä ei löytynyt</p>}
    </div>
  )
}

export default MyRecipes
