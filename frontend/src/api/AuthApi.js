import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  register(data) {
    return api.post('/register', data)
  },
  login(data) {
    return api.post('/login', data)
  }
}