import axios from 'axios'
const baseUrl = '/api/user'

// handle login
const login = (username, password) => {
  const request = axios.post(`${baseUrl}/login/${username}&${password}`)
  return request.then(response => response.data)
}

/*
not needed in this page, but good to have incase it becomes needed
// handle authentication
const auth = (username, password, loginKEY) => {
  const request = axios.post(`${baseUrl}/auth/${username}&${password}&${loginKEY}`)
  return request.then(response => response.data)
}
*/

// handle logout
const logout = (id, loginKEY) => {
  const request = axios.post(`${baseUrl}/logout/${id}&${loginKEY}`)
  return request.then(response => response.data)
}

export default { login, logout }