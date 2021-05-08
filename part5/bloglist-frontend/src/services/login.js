import axios from "axios"

// "proxy": "http://localhost:3001" (https://create-react-app.dev/docs/proxying-api-requests-in-development)
const baseUrl = "/api/login"

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }