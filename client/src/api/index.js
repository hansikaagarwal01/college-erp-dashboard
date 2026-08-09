import api from './client'

export const loginApi = (credentials) => api.post('/auth/login', credentials)

export const getDashboardStats = async () => {
  const { data } = await api.get('/dashboard/stats')
  return data
}

export default api
