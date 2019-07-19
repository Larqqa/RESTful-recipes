import React, { useState, useEffect } from 'react'
import anime from 'animejs'

import recipesService from './services/recipes'
import userService from './services/user'
import loginService from './services/login'
import loginSessions from './services/loginSessions'

import Navigation from './components/model/Navigation'
import Login from './components/model/Login'
import Register from './components/model/Register'
import Recipes from './components/model/Recipes'
import MyRecipes from './components/model/MyRecipes'
import Recipe from './components/model/Recipe'
import User from './components/model/User'
import AddRecipe from './components/model/AddRecipe'
import HeroRecipe from './components/model/HeroRecipe'

import './App.scss'

function App() {
  const [recipes, setRecipes] = useState('')
  const [heroRecipe, setHeroRecipe] = useState('')
  const [recipe, setRecipe] = useState('')
  const [lastTarget, setLastTarget] = useState('hero')
  const [animationClicked, setanimationClicked] = useState(false)
  const [editableRecipe, setEditableRecipe] = useState('')
  const [user, setUser] = useState()
  const [userRecipes, setUserRecipes] = useState('')
  const [dest, setDest] = useState()
  const [font, setFont] = useState("'Bangers', cursive")

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
  
  useEffect(() => {
    const user = loginSessions.checkLogin()
    if(user) {
      setUser(user)
      recipesService
      .getAllById(user.id)
      .then(recipes => {
        setUserRecipes(recipes)
      })
    }

    recipesService
    .getAll()
    .then(recipes => {
      setRecipes(recipes)
      const rand = Math.floor(Math.random() * (recipes.length))
      setHeroRecipe(recipes[rand])
    })
  }, [])
  
  const handleChange = (e) => {
    e.preventDefault()
    const rand = Math.floor(Math.random() * (recipes.length))
    setFont(fonts[Math.floor(Math.random() * fonts.length)])
    setHeroRecipe(recipes[rand])
  }
  
  /*
  const handleFront = (e) => {
    e.preventDefault()
    animate(lastTarget, 'hero')

  }
  
  const handleRecipes = (e) => {
    e.preventDefault()
    animate(lastTarget, 'recipes')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    animate(lastTarget, 'loginForm')
  }

  const handleRegistration = (e) => {
    e.preventDefault()
    animate(lastTarget, 'registrationForm')
  }

  const handleUser = (e) => {
    e.preventDefault()
    animate(lastTarget, 'user')
  }

  const handleAddRecipe = (e) => {
    e.preventDefault()
    setEditableRecipe('')
    animate(lastTarget, 'addRecipe')
  }
  
  const goTo = (e) => {
    animate(lastTarget, e.target.value)
  }

  const goToEdit = (e) => {
    const tar = e.target.value.split(':')
    recipesService
    .getOne(tar[0])
    .then(recipe => {
      setEditableRecipe(recipe)
      animate(lastTarget, tar[1])
    })
  }

  const handleMyRecipes = (e) => {
    e.preventDefault()
    animate(lastTarget, 'myRecipes')
  }
  HANDLE ANIMATION CHANGES END */

  /* HANDLE VALUE CHANGING */
  const animate = (lastTar, newTar) => {
    const animSpeed = 250

    if(lastTar === newTar || animationClicked) return

    anime({
      begin: () => {
        setanimationClicked(true)
      },
      targets: `#${lastTar}`,
      opacity: 0,
      translateX: 100,
      duration: animSpeed,
      easing: 'easeInOutExpo',
      complete: () => {
        setFont(fonts[Math.floor(Math.random() * fonts.length)])
        document.getElementById(lastTar).style.pointerEvents = 'none'
        anime({
          targets: `#${newTar}`,
          opacity: 1,
          translateX: [-100,0],
          duration: animSpeed,
          easing: 'easeInOutExpo',
          complete: () => {
            document.getElementById(newTar).style.pointerEvents = 'all'
            setLastTarget(newTar)
            setanimationClicked(false)
          }    
        })
      }
    })
  }

  const handleOpen = (e) => {
    const vals = e.target.value.split(':')
    recipesService
    .getOne(vals[0])
    .then(recipe => {
      animate(lastTarget, 'recipe')
      setDest(vals[1])
      setRecipe(recipe)
    })
  }

  const loginHandler = (e) => {
    e.preventDefault()

    loginService
    .login(e.target[0].value, e.target[1].value)
    .then(user => {
      console.log(user)
      setUser(user)
      loginSessions.saveLogin(user)
      animate(lastTarget, 'hero')
    })
  }

  const registerHandler = (e) => {
    e.preventDefault()

    const obj = {
      username: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    }
    userService
    .create(obj)
    .then(user => {
      console.log(user)
      setUser(user)
      loginSessions.saveLogin(user)
      animate(lastTarget, 'user')
    })
  }

  const createRecipeHandler = (e) => {
    e.preventDefault()

    const obj = {
      category: e.target[0].value,
      title: e.target[1].value,
      description: e.target[2].value,
      ingredients: e.target[3].value.includes(',') ? e.target[3].value.split(',') : e.target[3].value,
      steps: e.target[4].value.includes(',') ? e.target[4].value.split(','): e.target[4].value,
      servings: e.target[5].value,
      timeToMake: e.target[6].value,
      userID: user.id,
    }

    if(e.target.editId.value) {
      obj.userID = null
      recipesService
      .edit(e.target.editId.value, user.id, user.loginKEY, obj)
      .then(res => {
        recipesService
        .getAll()
        .then(recipes => {
          setRecipes(recipes)
          animate(lastTarget, 'hero')
        })
        recipesService
        .getAllById(user.id)
        .then(recipes => {
          setUserRecipes(recipes)
        })
      })
    } else {
      recipesService
      .create(user.loginKEY, obj)
      .then(res => {
        recipesService
        .getAll()
        .then(recipes => {
          setRecipes(recipes)
          animate(lastTarget, 'hero')
        })
        recipesService
        .getAllById(user.id)
        .then(recipes => {
          setUserRecipes(recipes)
        })
      })
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    loginSessions.clearLogin()
    
    loginService
    .logout(user.id, user.loginKEY)
    .then(res => {
      setUser('')
      console.log(lastTarget)
      animate(lastTarget, 'hero')
    })
  }

  const handleUserChange = (e) => {
    e.preventDefault()

    const obj = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.newPass.value,
    }

    userService
    .edit(user.username, e.target.oldPass.value, user.loginKEY, obj)
    .then(res => {
      console.log(res)
      setUser(res)
    })
  }
  /* HANDLE VALUE CHANGES END */

  return (
    <div className="App">
      <div className="bg"></div>

      <Navigation
        handleLogin={handleLogin}
        handleRegistration={handleRegistration}
        handleFront={handleFront} handleRecipes={handleRecipes}
        handleUser={handleUser}
        user={user}
        handleLogout={handleLogout}
        handleAddRecipe={handleAddRecipe}
        handleMyRecipes={handleMyRecipes}
      />

      <Login
        loginHandler={loginHandler}
      />

      <Register
        registerHandler={registerHandler}
      />

      <User
        user={user}
        handleUserChange={handleUserChange}
      />

      <HeroRecipe
        recipe={heroRecipe}
        font={font}
        handleOpen={handleOpen}
        handleChange={handleChange}
      />

      <Recipe
        recipe={recipe}
        goTo={goTo}
        goToEdit={goToEdit}
        dest={dest}
        user={user}
      />

      <Recipes
        recipes={recipes}
        handleOpen={handleOpen}
      />

      <MyRecipes
        recipes={userRecipes}
        handleOpen={handleOpen}
      />

      <AddRecipe
        user={user}
        createRecipeHandler={createRecipeHandler}
        editableRecipe={editableRecipe}
      />

    </div>
  )
}

export default App
