import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons'; // Connect to backend

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const create = (newObj) => {
  const request = axios.post(baseUrl, newObj);
  return request.then(response => response.data);
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
}

const update = (id, newObj) => {
  const request = axios.put(`${baseUrl}/${id}`, newObj);
  return request.then(response => response.data);
}

export default { getAll, create, remove, update };