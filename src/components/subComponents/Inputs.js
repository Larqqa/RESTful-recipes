import React from 'react'

function Inputs({handleChange, editable, match}) {
  return (
    <>
    <input name="title" value={editable.title || ''} onChange={handleChange} placeholder="Otsikko" required />
    <textarea name="description" value={editable.description || ''} onChange={handleChange} placeholder="Kuvaus" rows="5" required />
    <textarea name="ingredients" value={editable.ingredients || ''} onChange={handleChange} placeholder="Ainekset (erota pilkulla)" rows="5" required />
    <textarea name="steps" value={editable.steps || ''} onChange={handleChange} placeholder="Vaiheet (erota pilkulla)" rows="5" required />
    <input name="servings" type="number" step="any" value={editable.servings || ''} onChange={handleChange} placeholder="Annokset" />
    <input name="timeToMake" type="number" step="any" value={editable.timeToMake || ''} onChange={handleChange} placeholder="Valmistus aika" />
    <input type="hidden" name="editId" value={match.params.id || ''} />
    </>
  )
}

export default Inputs