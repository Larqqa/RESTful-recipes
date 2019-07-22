import axios from 'axios'
const baseUrl = '/api/recipes'

// Get all recipes
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// Get all recipes by user id
const getAllById = (id) => {
  const request = axios.get(`${baseUrl}/user/${id}`)
  return request.then(response => response.data)
}

// Get all recipes by filter groups
const getAllByGroups = (arr, id) => {
  const body = {group: arr}

  // if user id, get users recipes filtered by filter groups
  if(!id) {
    const request = axios.post(`${baseUrl}/group/`, body)
    return request.then(response => response.data)
  } else {
    // else get all by filter groups
    const request = axios.post(`${baseUrl}/group/${id}`, body)
    return request.then(response => response.data)
  }
}

// Get one recipe by id
const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

// Get one recipe by title
const getOneByTitle = (title) => {
  const request = axios.get(`${baseUrl}/title/${title}`)
  return request.then(response => response.data)
}

// Create new recipe
const create = (loginKEY, body) => {
  const request = axios.post(`${baseUrl}/${loginKEY}`, body)
  return request.then(response => response.data)
}

// Delete recipe
const del = (id, userID, loginKEY) => {
  const request = axios.delete(`${baseUrl}/${id}&${userID}&${loginKEY}`)
  return request.then(response => response.data)
}

// Edit recipe
const edit = (id, userID, loginKEY, body) => {
  const request = axios.put(`${baseUrl}/${id}&${userID}&${loginKEY}`, body)
  return request.then(response => response.data)
}

export default { getAll, getAllById, getOne, getOneByTitle, create, del, edit, getAllByGroups}