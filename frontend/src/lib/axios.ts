// import { getToken } from '@/services/auth'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': getToken()
  }
})

export default api