import React from 'react'

function AddRecipe({user, createRecipeHandler, cat, group, handleGroup}) {
  if(!user) return <p>Et ole kirjautunut sisään</p>

  return (
    <div id="addRecipe">
      <h3>Lisää uusi resepti</h3>
      <form onSubmit={createRecipeHandler}>
        <select name="category" required>
          {cat.map(cat => {
            if(cat === 'Kaikki') return null
            return <option key={cat} value={cat.toLowerCase()}>{cat}</option>
          })}
        </select>
        <ul id="group">
        {group.map(opt => {
          if(opt === 'Kaikki') return null
          return <li key={opt}><label><input type="checkbox" onChange={handleGroup} value={opt.toLowerCase()} />{opt}</label></li>
        })}
        </ul>

        <input name="title" placeholder="Otsikko" required />
        <textarea name="description" placeholder="Kuvaus" rows="5" required />
        <textarea name="ingredients" placeholder="Ainekset (erota pilkulla)" rows="5" required />
        <textarea name="steps" placeholder="Vaiheet (erota pilkulla)" rows="5" required />
        <label>
          Annokset
          <input name="servings" step="any" type="number" value="0" />
        </label>
        <label>
          Valmistus aika minuutteina
          <input name="timeToMake" step="any" type="number" value="0" />
        </label>

        <input type="hidden" name="editId" value='' />
        <button>Lisää</button>
      </form>
    </div>
  )
}

export default AddRecipe