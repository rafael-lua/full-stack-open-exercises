import axios from "axios"

// "proxy": "http://localhost:3001" (https://create-react-app.dev/docs/proxying-api-requests-in-development)
const baseUrl = "/api/blogs"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response)
  return response.data
}

export default { getAll }