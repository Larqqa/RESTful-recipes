import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import {Redirect} from 'react-router'
import anime from 'animejs'

import './App.scss'

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
import EditRecipe from './components/model/EditRecipe'
import HeroRecipe from './components/model/HeroRecipe'


function App() {
  const [recipes, setRecipes] = useState()
  const [heroRecipe, setHeroRecipe] = useState()
  const [recipe, setRecipe] = useState()
  const [user, setUser] = useState()
  const [userRecipes, setUserRecipes] = useState()
  const [dest, setDest] = useState()
  const [font, setFont] = useState("'Bangers', cursive")
  const [redirect, setRedirect] = useState()
  const [editable, setEditable] = useState({})

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
  */

  const handleOpen = (e) => {
    e.preventDefault()

    const vals = e.target.value.split(':')
    recipesService
    .getOne(vals[0])
    .then(recipe => {
      setRecipe(recipe)
      setDest(vals[1])
      setRedirect()
      setRedirect(`/recipe/${recipe.title.replace(' ', '_')}`)
    })
  }

  const goTo = (e) => {
    e.preventDefault()

    setRedirect()
    setRedirect(e.target.value)
  }

  const loginHandler = (e) => {
    e.preventDefault()

    loginService
    .login(e.target[0].value, e.target[1].value)
    .then(user => {
      console.log(user)
      setUser(user)
      loginSessions.saveLogin(user)
      setRedirect()
      setRedirect('/')
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
      setRedirect()
      setRedirect('/')
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
    } else {
      recipesService
      .create(user.loginKEY, obj)
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
        setDest('myRecipes')
        setRedirect()
        setRedirect(`/recipe/${res.title.replace(' ', '_')}`)
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
      setRedirect()
      setRedirect('/')
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

  const delUser = (e) => {
    e.preventDefault()

    userService
    .del(user.username, window.prompt("Oletko varma että haluat poistaa käyttäjätilisi? Anna salasana ja paina ok."), user.loginKEY)
    .then(() => {
      setUser()
      setRedirect()
      setRedirect('/')
    })
  }

  const delRecipe = (e) => {
    e.preventDefault()

    if(window.confirm("Oletko varma että haluat poistaa tämän reseptin?")) {
      recipesService
      .del(e.target.value, user.id, user.loginKEY)
      .then(() => {
        setUser(user)
        recipesService
        .getAllById(user.id)
        .then(recipes => {
          setUserRecipes(recipes)
          setRedirect()
          setRedirect('/myRecipes')
      })
      })
    } else {
      return
    }

  }
  const clearEdit = () => {
    setEditable({})
  }

  return (
    <Router>
      {redirect ? <Redirect to={redirect} /> : false}
      <div className="App">
        <div className="bg"></div>
        <Navigation Link={Link} user={user} handleLogout={handleLogout} clearEdit={clearEdit} />
        
        <Route exact path='/'
          render={(routeProps) => (
            <HeroRecipe
            {...routeProps}
            {...{
              font: font,
              recipe: heroRecipe,
              handleOpen: handleOpen,
              handleChange: handleChange
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
              handleUserChange: handleUserChange,
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
              goTo: goTo,
              dest: dest,
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
              handleOpen: handleOpen
            }} />
          )}
        />

        <Route path='/myRecipes'
          render={(routeProps) => (
            <MyRecipes
            {...routeProps}
            {...{
              recipes: userRecipes,
              handleOpen: handleOpen
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
              editable, setEditable
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
              editable, setEditable
            }} />
          )}
        />

      </div>
    </Router>
  )
}

export default App
