import React from 'react'
import Select from '../../utils/select'


function Recipes({recipes, handleOpen}) {
  if(!recipes) return <></>
  const Recipe = ({recipe}) => {
    return (
      <div>
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
        <button onClick={handleOpen} value={`${recipe.id}:recipes`} >Avaa</button>
      </div>
    )
  }

  // Double wrappers to hide scroll bar
  return (
    <div id="recipes">
      <div className="wrapper--wrapper">
        <div className="wrapper">
          <div className="recipe__Header">
            <h1>Uusimpia reseptejä:</h1>
            <Select />
            {recipes.map((recipe, i) => <Recipe key={i} recipe={recipe}/>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipes
