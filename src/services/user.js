import axios from 'axios'
const baseUrl = '/api/users'

// Get all users
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// Get one user by id
const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

// Create new user
const create = (body) => {
  const request = axios.post(baseUrl, body)
  return request.then(response => response.data)
}

// Delete user
const del = (username, password, loginKEY) => {
  const request = axios.delete(`${baseUrl}/${username}&${password}&${loginKEY}`)
  return request.then(response => response.data)
}

// Edit username & password & email
const edit = (username, password, loginKEY, body) => {
  // Set to a value, so the search works on backend.
  // No 0 values are used in the query any other time than this
  if(!username) username = 0
  if(!password) password = 0

  // if body doesnt have values, remove them from the object
  Object.keys(body).forEach(key => {
    if(!body[key]) delete body[key]
  })

  const request = axios.put(`${baseUrl}/${username}&${password}&${loginKEY}`, body)
  return request.then(response => response.data)
}

export default { getAll, getOne, create, del, edit}