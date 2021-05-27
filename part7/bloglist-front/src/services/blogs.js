import axios from "axios"

// "proxy": "http://localhost:3001" (https://create-react-app.dev/docs/proxying-api-requests-in-development)
const baseUrl = "/api/blogs"

let token = null
const setToken = (t) => {
  token = `bearer ${t}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
  const config = {
    headers: {
      Authorization: token
    },
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (blog, payload) => {
  const config = {
    headers: {
      Authorization: token
    },
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, { likes: payload }, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: {
      Authorization: token
    },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const sendComment = async (blog, comment) => {
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, { comment: comment })
  return response.data
}

export default { getAll, setToken, create, update, remove, sendComment }