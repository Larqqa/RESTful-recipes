const saveLogin = (user) => {
  sessionStorage.setItem("username", user.username)
  sessionStorage.setItem("id", user.id)
  sessionStorage.setItem("email", user.email)
  sessionStorage.setItem("loginKEY", user.loginKEY)

  console.log('login session set')
}

const checkLogin = () => {
  if(!sessionStorage.getItem("username")) return

  const obj = {
    username: sessionStorage.getItem("username"),
    id: sessionStorage.getItem("id"),
    email: sessionStorage.getItem("email"),
    loginKEY: sessionStorage.getItem("loginKEY"),
  }
  
  console.log('login session found')

  return obj
}

const clearLogin = () => {
  sessionStorage.clear()
  console.log('session cleared')
}

export default { saveLogin, checkLogin, clearLogin }