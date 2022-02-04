import axios from 'axios';

const apiClient = axios.create({
  baseURL: `https://localhost:5000/`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  login() {
    return apiClient.post('/api/login')
  },
  getData() {
    return apiClient.get('/api')
  },
  getDataById(id) {
    return apiClient.get('/api/' + id)
  },
  createData(newData) {
    return apiClient.post('/api', newData)
  },
  removeDataById(id) {
    return apiClient.delete('/api/' + id)
  },
  putDataById(id, oldData) {
    return apiClient.put('/api/' + id, oldData)
  }
}
