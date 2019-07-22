import React from 'react'
import Recipe from './subComponents/SingleRecipe'

function Recipes({recipes, handleOpen, cat, handleChange, group, addArrays, handleGroup}) {
  if(!recipes) return <></>

  return (
    <div id="recipes">
      <h1>Uusimpia reseptejä:</h1>
      <select name="recipesCategory" onChange={handleChange}>
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
      {recipes.length <= 0 ? <p>Ei hakutuloksia</p> : false}
      {recipes.map((recipe, i) => <Recipe key={i} recipe={recipe} handleOpen={handleOpen} dest={'recipes'} />)}
    </div>
  )
}

export default Recipes
