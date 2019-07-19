import React from 'react'
import recipesService from '../../services/recipes'

function EditRecipe({user, createRecipeHandler, editable, setEditable, match}) {
  if(!user) return <></>

  if(!editable.title && match.params.id) {
    recipesService
    .getOne(match.params.id, '')
    .then(recipe => {
      setEditable({...recipe})
      return <></>
    })
  }
  
  const handleChange = (e) => {
    const edit = editable
    edit[e.target.name] = e.target.value
    setEditable({...edit})
  }


  return (
    <div id="addRecipe">
      <div className="formWrap">
        <div className="form">
          <h3>Lisää uusi resepti</h3>
          <form onSubmit={createRecipeHandler}>
            <select name="category" value={editable.category || ''} onChange={handleChange}>
              <option value="aamupala">Aamupala</option>
              <option value="Lounas">Lounas</option>
              <option value="Päivällinen">Päivällinen</option>
              <option value="Välipala">Välipala</option>
              <option value="Jälkiruoka">Jälkiruoka</option>
            </select>
            <input name="title" value={editable.title || ''} onChange={handleChange} placeholder="Otsikko" />
            <textarea name="description" value={editable.description || ''} onChange={handleChange} placeholder="Kuvaus" rows="5"/>
            <textarea name="ingredients" value={editable.ingredients || ''} onChange={handleChange} placeholder="Ainekset (erota pilkulla)" rows="5" />
            <textarea name="steps" value={editable.steps || ''} onChange={handleChange} placeholder="Vaiheet (erota pilkulla)" rows="5" />
            <input name="servings" type="number" value={editable.servings || ''} onChange={handleChange} placeholder="Annokset" />
            <input name="timeToMake" type="number" value={editable.timeToMake || ''} onChange={handleChange} placeholder="Valmistus aika" />
            <input type="hidden" name="editId" value={match.params.id || ''} />
            <button>Lisää</button>
          </form>
        </div>
      </div> 
    </div>
  )
}

export default EditRecipe