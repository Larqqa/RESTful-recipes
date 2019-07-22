/* MAIN */
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import {Redirect} from 'react-router'
import './App.scss'

/* SERVICES */
import recipesService from './services/recipes'
import userService from './services/user'
import loginService from './services/login'
import loginSessions from './services/loginSessions'

/* COMPONENTS */
import Navigation from './components/Navigation'
import Login from './components/Login'
import Register from './components/Register'
import Recipes from './components/Recipes'
import MyRecipes from './components/MyRecipes'
import Recipe from './components/Recipe'
import User from './components/User'
import AddRecipe from './components/AddRecipe'
import EditRecipe from './components/EditRecipe'
import HeroRecipe from './components/HeroRecipe'

/* APP */
function App() {
  // Hooks
  const [recipes, setRecipes] = useState()
  const [heroRecipe, setHeroRecipe] = useState()
  const [recipe, setRecipe] = useState()
  const [editable, setEditable] = useState({})
  const [user, setUser] = useState()
  const [userRecipes, setUserRecipes] = useState()
  const [error, setError] = useState('')
  const [dest, setDest] = useState()
  const [font, setFont] = useState("'Bangers', cursive")
  const [redirect, setRedirect] = useState()
  const [filter, setFilter] = useState(['rand','kaikki'])
  const [addArrays, setAddArrays] = useState({group:[], ingredients:[], steps:[]})

  // Pre-set categories
  const cat = [
    'Kaikki',
    'Aamupala',
    'Lounas',
    'Päivällinen',
    'Välipala',
    'Iltapala',
    'Jälkiruoka'
  ]

  // Pre-set groups
  const group = [
    'Kana ja linnut',
    'Punainenliha',
    'Kasvis',
    'Kala ja äyriäiset',
    'Maidoton',
    'Kananmunaton',
    'Marjat ja hedelmät',
    'Vilja ja riisi',
    'Maitotuotteet',
    'Kananmuna'
  ]

  // Hero image changing fonts
  const fonts = [
    "'Bangers', cursive",
    "'Creepster', cursive",
    "'Ewert', cursive",
    "'Fascinate', cursive",
    "'Metal Mania', cursive",
    "'Oleo Script Swash Caps', cursive",
    "'Pacifico', cursive",
    "'Patua One', cursive",
    "'Permanent Marker', cursive",
    "'Piedra', cursive",
    "'Ranchers', cursive",
    "'Trade Winds', cursive"
  ]

  // After page load, hide loader
  const handleLoad = () => {
    let opacity = 1;
    const loader = document.getElementById('loader')

    const refreshIntervalId = setInterval(() => {
      if(opacity <= 0) {
        clearInterval(refreshIntervalId)
        loader.remove()
      }
      opacity -= .05
      loader.style.opacity = opacity
    }, 10)
  }
  
  // On init get recipes and check if user is logged in
  useEffect(() => {
    window.addEventListener('load', handleLoad)
    
    const user = loginSessions.checkLogin()

    // Get user recipes
    if(user) {
      setUser(user)
      recipesService
      .getAllById(user.id)
      .then(recipes => {
        setUserRecipes(recipes)
      })
      .catch(error => setError(error.toString()))
    }

    // Get all recipes
    recipesService
    .getAll()
    .then(recipes => {
      setRecipes(recipes)

      // Get random recipe for hero
      const rand = Math.floor(Math.random() * (recipes.length))
      setHeroRecipe(recipes[rand])
    })
    .catch(error => setError(error.toString()))
  }, [])

  /* ------------USER------------ */

  // Handle logging in
  const loginHandler = (e) => {
    e.preventDefault()

    loginService
    .login(e.target.name.value, e.target.pass.value)
    .then(user => {
      recipesService
      .getAllById(user.id)
      .then(recipes => {
        setUser(user)
        setUserRecipes(recipes)
        loginSessions.saveLogin(user)
        setRedirect()
        setRedirect('/')
      })
    })
    .catch(error => setError(error.toString()))
  }

  // Handle registering
  const registerHandler = (e) => {
    e.preventDefault()

    const obj = {
      username: e.target.name.value,
      password: e.target.pass.value,
    }
    userService
    .create(obj)
    .then(user => {
      setUser(user)
      loginSessions.saveLogin(user)
      setRedirect()
      setRedirect('/')
    })
    .catch(error => {
      const message = error.response
      console.log(`${message.status} : ${message.statusText} | ${message.data}`)
    })
  }

  // handle logging out
  const handleLogout = (e) => {
    e.preventDefault()
    loginSessions.clearLogin()
    
    loginService
    .logout(user.id, user.loginKEY)
    .then(res => {
      setUser('')
      loginSessions.clearLogin()
      setUserRecipes('')
      setRedirect()
      setRedirect('/')
    })
    .catch(error => setError(error.toString()))
  }

  // Handle changing user credentials
  const handleUserNameChange = (e) => {
    e.preventDefault()

    const obj = {
      username: e.target.username.value,
      //email: e.target.email.value,
    }

    userService
    .edit(user.username, '', user.loginKEY, obj)
    .then(res => {
      setUser(res)
    })
  }
  const handleUserPassChange = (e) => {
    e.preventDefault()

    const obj = {
      password: e.target.newPass.value,
    }

    userService
    .edit(user.username, e.target.oldPass.value, user.loginKEY, obj)
    .then(res => {
      setUser(res)
    })
  }

  // Handle deleting user
  const delUser = (e) => {
    e.preventDefault()

    // Prompt requires users password to allow for deletion
    const pass = window.prompt("Oletko varma että haluat poistaa käyttäjätilisi? Anna salasana ja paina ok.")
    if (!pass) return
    userService
    .del(user.username, pass, user.loginKEY)
    .then(() => {
      setUser()
      loginSessions.clearLogin()
      console.log('Käyttäjä poistettu, hei hei :(')
      setRedirect()
      setRedirect('/')
    })
  }

  /* ------------USER END------------ */

  /* ------------RECIPES------------ */

  // Handle recipe change on hero & filtering on myrecipes & recipes
  // Filter[0] = the front page buttons for random and random from own recipe
  // Filter[1] = the select option form
  const handleChange = (e) => {

    // Event is not sent from checkbox lists, only the select menus
    if (e) {
      const name = e.target.getAttribute('name')
      const tar = e.target.value

      recipesService
      .getAll()
      .then(recipes => {
        setRecipes(recipes)

        let allRecipes = recipes

        // If user is chosen on front page, or myRecipes is calling the function, set all recipes to users recipes
        if (filter[0] === 'ownRand' && userRecipes.length > 0 && user && name !== 'recipesCategory' && name !== 'myRecipesCategory') allRecipes = userRecipes
        
        // If filter is 'all' set filter to '' which means all :D
        if (name === 'recipesCategory' || name === 'myRecipesCategory') {
          const filt = filter
          filt[1] = tar === 'kaikki' ? '' : tar
          setFilter(filt)
        }

        // If filter is null or 'all' return all recipes 
        allRecipes = allRecipes.filter(recipe => {
          if(!filter[1] || filter[1] === 'kaikki') return recipe
          
          // If recipe.category is same as filter return recipe
          if(recipe.category === filter[1]) return recipe

          // If recipe.category != filter, return null
          return null
        })

        // recipes category wants all recipes, which have been filtered above
        if (name === 'recipesCategory') {
          setRecipes(allRecipes)
          return
        }

        // my recipes category wants only the users recipes
        // We do this by filtering the recipe array with the users id
        if (name === 'myRecipesCategory') {
          allRecipes = allRecipes.filter(recipe => recipe.userID === user.id)

          setUserRecipes(allRecipes)
          return
        }

        // Get random recipe from the filtered list to display on hero page
        const rand = Math.floor(Math.random() * (allRecipes.length))
        setFont(fonts[Math.floor(Math.random() * fonts.length)])
        setHeroRecipe(allRecipes[rand])
      })   
    } else {
      // If filtering is done through the checkboxes, the filtering happens server side.
      // Filter array is compared with recipe group array and returned if all match

      // Gets recipes with user id
      recipesService
      .getAllByGroups(addArrays.group, user.id)
      .then(recipes => {
        setUserRecipes(recipes)
      })

      // Gets all recipes
      recipesService
      .getAllByGroups(addArrays.group)
      .then(recipes => {
        setRecipes(recipes)
      })
    }
  }

  // Handle recipe opening
  const handleOpen = (e) => {
    e.preventDefault()

    // e.target is sent as a string formatted as "id:destination"
    const vals = e.target.value.split(':')
    recipesService
    .getOne(vals[0])
    .then(recipe => {
      setRecipe(recipe)
      setDest(vals[1])
      setRedirect()
      setRedirect(`/recipe/${recipe.title.replace(' ', '_')}`)
    })
    .catch(error => setError(error.toString()))
  }

  // Handle creating and editing recipes
  const createRecipeHandler = (e) => {
    e.preventDefault()

    // Create recipe object
    const obj = {
      category: e.target.category.value,
      group: addArrays.group,
      title: e.target.title.value,
      description: e.target.description.value,
      ingredients: e.target.ingredients.value.includes(',') ? e.target.ingredients.value.split(',') : e.target.ingredients.value,
      steps: e.target.steps.value.includes(',') ? e.target.steps.value.split(','): e.target.steps.value,
      servings: e.target.servings.value,
      timeToMake: e.target.timeToMake.value,
      userID: user.id,
    }

    // If target has editID then edit the existing recipe
    if(e.target.editId.value) {
      // Dont need to send user id to editable recipe
      delete obj.userID

      // Send edited recipe, update states for users recipes and single recipe, and redirect to recipe page
      recipesService
      .edit(e.target.editId.value, user.id, user.loginKEY, obj)
      .then(res => {
        setRecipe(res)
        recipesService
        .getAll()
        .then(recipes => {
          setRecipes(recipes)
        })
        recipesService
        .getAllById(user.id)
        .then(recipes => {
          setUserRecipes(recipes)
        })
        setRedirect()
        setRedirect(`/recipe/${res.title.replace(' ', '_')}`)
      })
      .catch(error => setError(error.toString()))
    } else {
      // If target has no id, create new recipe
      // Send new recipe, update states for users recipes and all recipes, and redirect to users recipes page
      recipesService
      .create(user.loginKEY, obj)
      .then(res => {
        console.log(res)
        setRecipe(res)
        recipesService
        .getAll()
        .then(recipes => {
          setRecipes(recipes)
        })
        recipesService
        .getAllById(user.id)
        .then(recipes => {
          setUserRecipes(recipes)
        })
        setDest('myRecipes')
        setRedirect()
        setRedirect(`/recipe/${res.title.replace(' ', '_')}`)
      })
      .catch(error => setError(error.toString()))
    }
  }

  // Handle deleting recipes
  const delRecipe = (e) => {
    e.preventDefault()

    // Confirmation window checks if user is sure they want to delete the recipe
    if(window.confirm("Oletko varma että haluat poistaa tämän reseptin?")) {
      recipesService
      .del(e.target.value, user.id, user.loginKEY)
      .then(() => {
        recipesService
        .getAll()
        .then(recipes => {
          // Update user recipes and redicect
          setRecipes(recipes)
        })
        recipesService
        .getAllById(user.id)
        .then(recipes => {
          // Update user recipes and redicect
          setUserRecipes(recipes)
          setError('Resepti poistettu')
          setRedirect()
          setRedirect('/myRecipes')
        })
      })
      .catch(error => setError(error.toString()))
    } else {
      return
    }
  }

  /* ------------RECIPES END------------ */

  /* ------------UTILITY------------ */

  // set Group states
  const handleGroup = (e) => {
    const arr = addArrays
    const index = arr.group.indexOf(e.target.value)

    // If the target is found in the state array, remove it, as the checkbox was unchecked
    if (index >= 0) {
      arr.group.splice(index, 1)
      setAddArrays({...arr})

      // for recipes search re-rendering
      if(e.target.name === 'recipes') handleChange()
      return
    }

    // if no target was in the state array, add it as the checkbox was checked
    arr.group.push(e.target.value)
    setAddArrays({...arr})

    // for recipes search re-rendering
    if(e.target.name === 'recipes') handleChange()
  }

  // Change filters in hero page
  const changeFilter = (e) => {
    e.preventDefault()
    const filt = filter

    switch (e.target.value) {
      case 'ownRand':
        // Random own recipe
        filt[0] = e.target.value
        setFilter(filt)
        break;
      case 'rand':
        // Random recipe
        filt[0] = e.target.value
        setFilter(filt)
        break;
      default:
        // Set filter from the dropdown list
        if(e.target.getAttribute('name') === 'category') {
          if(e.target.value === 'kaikki') {
            filt[1] = ''
            setFilter(filt)
            break;
          }
          filt[1] = e.target.value
          setFilter(filt)
        }
        break;
    }
    handleChange(e)
  }
  
  // Handle hamburger navigation
  const hamburgerClick = (e) => {
    e.preventDefault()

    const nav = document.getElementById('nav')
    const burger = document.getElementById('hamburger')

    // If burger is active, make it not active :D
    if(burger.classList.contains('active')) {
      nav.classList.remove('show')
      burger.classList.remove('active')
    } else {
      nav.classList.add('show')
      burger.classList.add('active')
    }
  }

  // Clear edit form
  const clearEdit = () => {
    setEditable({})
  }

  // Error handling
  const err = () => {
    
  }

  /* ------------UTILITY END------------ */

  return (
    <Router>
      <div id="error">{error}</div>
      <div id="loader"><h1>Ladataan</h1></div>
      {redirect ? <Redirect to={redirect} /> : false}
      <div id="main">
        <div className="bg--overlay"></div>
        <button id="hamburger" onClick={hamburgerClick}><i className="fas fa-bars" /></button>
        <Navigation Link={Link} user={user} handleLogout={handleLogout} clearEdit={clearEdit} />
        
        <Route exact path='/'
          render={(routeProps) => (
            <HeroRecipe
            {...routeProps}
            {...{
              font: font,
              recipe: heroRecipe,
              handleOpen: handleOpen,
              handleChange: handleChange,
              cat: cat,
              changeFilter: changeFilter,
              user: user
            }} />
          )}
        />

        <Route path='/login'
          render={(routeProps) => (
            <Login
            {...routeProps}
            {...{
              loginHandler: loginHandler
            }} />
          )}
        />

        <Route path='/register'
          render={(routeProps) => (
            <Register
            {...routeProps}
            {...{
              registerHandler: registerHandler
            }} />
          )}
        />

        <Route path='/user'
          render={(routeProps) => (
            <User
            {...routeProps}
            {...{
              user: user,
              handleUserNameChange: handleUserNameChange,
              handleUserPassChange: handleUserPassChange,
              delUser: delUser
            }} />
          )}
        />

        <Route path='/recipe/:id'
          render={(routeProps) => (
            <Recipe
            {...routeProps}
            {...{
              recipe: recipe,
              dest: dest,
              setEditable: setEditable,
              user: user,
              delRecipe: delRecipe,
              setRecipe: setRecipe,
              Link: Link
            }} />
          )}
        />

        <Route path='/recipes'
          render={(routeProps) => (
            <Recipes
            {...routeProps}
            {...{
              recipes: recipes,
              handleOpen: handleOpen,
              cat: cat,
              handleChange: handleChange,
              group: group,
              addArrays: addArrays,
              handleGroup: handleGroup
            }} />
          )}
        />

        <Route path='/myRecipes'
          render={(routeProps) => (
            <MyRecipes
            {...routeProps}
            {...{
              user: user,
              recipes: userRecipes,
              handleOpen: handleOpen,
              cat: cat,
              handleChange: handleChange,
              group: group,
              addArrays: addArrays,
              handleGroup: handleGroup
            }} />
          )}
        />

        <Route path='/addRecipe/'
          render={(routeProps) => (
            <AddRecipe
            {...routeProps}
            {...{
              user: user,
              createRecipeHandler: createRecipeHandler,
              cat: cat,
              group: group,
              handleGroup: handleGroup
            }} />
          )}
        />

        <Route path='/editRecipe/:id'
          render={(routeProps) => (
            <EditRecipe
            {...routeProps}
            {...{
              user: user,
              createRecipeHandler: createRecipeHandler,
              editable, setEditable,
              cat: cat,
              group: group,
              addArrays: addArrays,
              setAddArrays:setAddArrays,
              handleGroup: handleGroup
            }} />
          )}
        />

      </div>
    </Router>
  )
}

export default App
