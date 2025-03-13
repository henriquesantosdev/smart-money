import { getToken } from '@/services/auth';
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api