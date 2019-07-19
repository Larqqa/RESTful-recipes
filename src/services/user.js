import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const create = (body) => {
  const request = axios.post(baseUrl, body)
  return request.then(response => response.data)
}

const del = (username, password, loginKEY) => {
  const request = axios.delete(`${baseUrl}/${username}&${password}&${loginKEY}`)
  return request.then(response => response.data)
}

const edit = (username, password, loginKEY, body) => {
  if(!username) username = 0
  if(!password) password = 0

  Object.keys(body).forEach(key => {
    if(!body[key]) delete body[key]
  })

  const request = axios.put(`${baseUrl}/${username}&${password}&${loginKEY}`, body)
  return request.then(response => response.data)
}

export default { getAll, getOne, create, del, edit}