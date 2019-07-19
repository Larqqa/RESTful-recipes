import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/recipes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getAllById = (id) => {
  const request = axios.get(`${baseUrl}/user/${id}`)
  return request.then(response => response.data)
}

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const create = (loginKEY, body) => {
  const request = axios.post(`${baseUrl}/${loginKEY}`, body)
  return request.then(response => response.data)
}

const del = (id, userID, loginKEY) => {
  const request = axios.delete(`${baseUrl}/${id}&${userID}&${loginKEY}`)
  return request.then(response => response.data)
}

const edit = (id, userID, loginKEY, body) => {
  const request = axios.put(`${baseUrl}/${id}&${userID}&${loginKEY}`, body)
  return request.then(response => response.data)
}

export default { getAll, getAllById, getOne, create, del, edit}