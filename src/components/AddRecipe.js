import React from 'react'

function AddRecipe({user, createRecipeHandler, cat, group, handleGroup, addArrays, setAddArrays}) {
  if(!user) {
    return <p>Et ole kirjautunut sisään</p>
  }

  return (
    <div id="addRecipe">
      <h1>Lisää uusi resepti</h1>
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
            const index = addArrays.group.indexOf(opt.toLowerCase())
            if(index >= 0) {
              return <li key={opt}><input id={opt} type="checkbox" name='recipes' onChange={handleGroup} value={opt.toLowerCase()} checked={true} hidden /><label htmlFor={opt}>{opt}</label></li>
            }

            return <li key={opt}><input id={opt} type="checkbox" name='recipes' onChange={handleGroup} value={opt.toLowerCase()} checked={false} hidden /><label htmlFor={opt}>{opt}</label></li>
          })}
        </ul>

        <input name="title" placeholder="Otsikko" required />
        <textarea name="description" placeholder="Kuvaus" rows="5" required />
        <textarea name="ingredients" placeholder="Ainekset (erota ainekset eri riveille)" rows="5" required />
        <textarea name="steps" placeholder="Vaiheet (erota vaiheet eri riveille)" rows="5" required />
        
        <div id="add__bottom">
          <label>
            Annokset
            <input name="servings" step="any" type="number" placeholder="0" />
          </label>
          <label>
            Valmistus aika minuutteina
            <input name="timeToMake" step="any" type="number" placeholder="0" />
          </label>
        </div>

        <input type="hidden" name="editId" value='' />
        <button>Lähetä</button>
      </form>
    </div>
  )
}

export default AddRecipe