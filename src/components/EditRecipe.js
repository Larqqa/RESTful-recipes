import React from 'react'
import recipesService from '../services/recipes'

function EditRecipe({user, createRecipeHandler, editable, setEditable, match, cat, group, addArrays, setAddArrays, handleGroup}) {
  if(!user) return <p>Et ole kirjautunut sisään</p>

  // If the editable recipe is not found, and id is in url, set editable recipe state
  if(!editable.title && match.params.id) {
    recipesService
    .getOne(match.params.id, '')
    .then(recipe => {
      setEditable({...recipe})

      // Set checkboxes to the array from the recipe
      const arr = []
      recipe.group.map(group => 
        arr.push(group)
      )
      const obj = addArrays
      obj.group = arr
      setAddArrays({...obj})
    })
  }
  
  // Change the editable input field values as state
  const handleChange = (e) => {
    const edit = editable
    edit[e.target.name] = e.target.value
    setEditable({...edit})
  }

  // Set groups as component so it updates on addArray state change
  const Groups = ({addArrays}) => {
    return (
      <ul id="group">
        {group.map(opt => {
          if(opt === 'Kaikki') return null
          const index = addArrays.group.indexOf(opt.toLowerCase())
          if(index >= 0) {
            return <li key={opt}><label><input type="checkbox" name={opt} onChange={handleGroup} value={opt.toLowerCase()} checked={true} />{opt}</label></li>
          }

          return <li key={opt}><label><input type="checkbox" name={opt} onChange={handleGroup} value={opt.toLowerCase()} checked={false} />{opt}</label></li>
        })}
      </ul>
    )
  }

  return (
    <div id="addRecipe">
      <h3>Lisää uusi resepti</h3>
      <form onSubmit={createRecipeHandler}>
        <select name="category" value={editable.category || ''} onChange={handleChange} >
          {cat.map((cat, i) => {
            if(cat === 'Kaikki') return null
            return <option key={i} value={cat.toLowerCase()}>{cat}</option>
          })}
        </select>
        <Groups addArrays={addArrays}/>

        <input name="title" value={editable.title || ''} onChange={handleChange} placeholder="Otsikko" required />
        <textarea name="description" value={editable.description || ''} onChange={handleChange} placeholder="Kuvaus" rows="5" required />
        <textarea name="ingredients" value={editable.ingredients || ''} onChange={handleChange} placeholder="Ainekset (erota pilkulla)" rows="5" required />
        <textarea name="steps" value={editable.steps || ''} onChange={handleChange} placeholder="Vaiheet (erota pilkulla)" rows="5" required />
        <label>
          Annokset
          <input name="servings" type="number" step="any" value={editable.servings || '0'} onChange={handleChange} />
        </label>
        <label>
          Valmistus aika minuutteina
          <input name="timeToMake" type="number" value={editable.timeToMake || '0'} onChange={handleChange} />
        </label>
        <input type="hidden" name="editId" value={match.params.id || ''} />
        <button>Lisää</button>
      </form>
    </div>
  )
}

export default EditRecipe