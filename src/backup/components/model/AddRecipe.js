import React from 'react'
import Select from '../../utils/select'

function AddRecipe({user, createRecipeHandler, editableRecipe}) {
  if(!user) return <></>

  return (
    <div id="addRecipe">
      <div className="formWrap">
        <div className="form">
          <h3>Lisää uusi resepti</h3>
          <form onSubmit={createRecipeHandler}>
            <Select />
            <input value={editableRecipe ? editableRecipe.title : 'Otsikko'} />
            <textarea placeholder={editableRecipe.description || 'Kuvaus'} rows="5"/>
            <textarea placeholder={editableRecipe ? `${editableRecipe.description} (erota ainekset pilkulla)` : 'Ainekset (erota pilkulla)'} rows="5" />
            <textarea placeholder={editableRecipe ? `${editableRecipe.steps} (erota ainekset pilkulla)` : 'Vaiheet (erota pilkulla)'} rows="5" />
            <input type="number" placeholder={editableRecipe.servings || 'Annokset'} />
            <input type="number" placeholder={editableRecipe.timeToMake || 'Valmistus aika'} />
            <input type="hidden" name="editId" value={editableRecipe.id || ''} />
            <button>Lisää</button>
          </form>
        </div>
      </div> 
    </div>
  )
}

export default AddRecipe