import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  } else {
    window.location.href = '/login'
  }
  return config
}, error => {
  return Promise.reject(error)
})


export default {
  getPendingAndReleaseChecklists() {
    return api.get('/checklists/status')
  },
  getPendingChecklists() {
    return api.get('/checklists/pending')
  },
  getReturnChecklists() {
    return api.get('/checklists/return')
  },
  getReleaseChecklists() {
    return api.get('/checklists/release')
  },
  getMaintenanceChecklists() {
    return api.get('/checklists/maintenance')
  },
  getDateReport(startDate, endDate) {
    return api.get('/checklists/analyze', {
      params: {
        startDate,
        endDate
      }
    })
  },
  create(data) {
    return api.post('/checklists', data)
  },
  releaseChecklist(checklist_id) {
    return api.post('/checklists/released', { checklist_id })
  },
  returnChecklist(checklist_id) {
    return api.post('/checklists/returned', { checklist_id })
  },
  approveMaintenance(id, updateData) {
    return api.patch(`/checklists/${id}/approveMaintenance`, updateData)
  }

}