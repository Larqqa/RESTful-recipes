// Save user information to session storage 
const saveLogin = (user) => {
  sessionStorage.setItem("username", user.username)
  sessionStorage.setItem("id", user.id)
  sessionStorage.setItem("email", user.email)
  sessionStorage.setItem("loginKEY", user.loginKEY)

  console.log('login session set')
}

// check if session storage has user info
const checkLogin = () => {
  
  // if username is not found, we can assume the session storage is empty 
  if(!sessionStorage.getItem("username")) return

  // create user object from session storage
  const obj = {
    username: sessionStorage.getItem("username"),
    id: sessionStorage.getItem("id"),
    email: sessionStorage.getItem("email"),
    loginKEY: sessionStorage.getItem("loginKEY"),
  }
  
  console.log('login session found')

  // Return object to be used on site
  return obj
}

// For logout clear the storage
const clearLogin = () => {
  sessionStorage.clear()
  console.log('session cleared')
}

export default { saveLogin, checkLogin, clearLogin }