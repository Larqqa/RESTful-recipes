import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/user'

const login = (username, password) => {
  const request = axios.post(`${baseUrl}/login/${username}&${password}`)
  return request.then(response => response.data)
}

const auth = (username, password, loginKEY) => {
  const request = axios.post(`${baseUrl}/auth/${username}&${password}&${loginKEY}`)
  return request.then(response => response.data)
}

const logout = (id, loginKEY) => {
  const request = axios.post(`${baseUrl}/logout/${id}&${loginKEY}`)
  return request.then(response => response.data)
}

export default { login, auth, logout }