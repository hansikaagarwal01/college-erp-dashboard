import api from './client'

// Auth
export const loginApi = (credentials) => api.post('/auth/login', credentials)

// Dashboard
export const getDashboardStats = async () => {
  const { data } = await api.get('/dashboard/stats')
  return data
}

// Attendance
export const getAttendance = (params) => api.get('/attendance', { params })
export const getAttendanceSummary = (params) => api.get('/attendance/summary', { params })
export const createAttendance = (payload) => api.post('/attendance', payload)
export const bulkCreateAttendance = (records) => api.post('/attendance/bulk', { records })
export const deleteAttendance = (id) => api.delete(`/attendance/${id}`)

// Exams
export const getExams = (params) => api.get('/exams', { params })
export const createExam = (payload) => api.post('/exams', payload)
export const updateExam = (id, payload) => api.put(`/exams/${id}`, payload)
export const deleteExam = (id) => api.delete(`/exams/${id}`)

// Results
export const getResults = (params) => api.get('/results', { params })
export const createResult = (payload) => api.post('/results', payload)
export const updateResult = (id, payload) => api.put(`/results/${id}`, payload)
export const deleteResult = (id) => api.delete(`/results/${id}`)
export const getStudentTranscript = (studentId) => api.get(`/results/transcript/${studentId}`)

// Timetable
export const getTimetable = (params) => api.get('/timetable', { params })
export const createTimetable = (payload) => api.post('/timetable', payload)
export const deleteTimetable = (id) => api.delete(`/timetable/${id}`)

// Files
export const uploadFiles = (formData) =>
  api.post('/files/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
export const getFiles = (params) => api.get('/files', { params })
export const getFileDownloadUrl = (id) => `/api/v1/files/${id}`
export const deleteFile = (id) => api.delete(`/files/${id}`)

// Fees
export const getFees = (params) => api.get('/fees', { params })
export const getFeeSummary = () => api.get('/fees/summary')
export const createFee = (payload) => api.post('/fees', payload)
export const recordFeePayment = (id, payload) => api.post(`/fees/${id}/pay`, payload)
export const deleteFee = (id) => api.delete(`/fees/${id}`)

// Notifications
export const getNotifications = (params) => api.get('/notifications', { params })
export const getUnreadCount = () => api.get('/notifications/unread-count')
export const createNotification = (payload) => api.post('/notifications', payload)
export const markNotificationRead = (id) => api.patch(`/notifications/${id}/read`)
export const markAllNotificationsRead = () => api.patch('/notifications/read-all')
export const deleteNotification = (id) => api.delete(`/notifications/${id}`)

export default api
