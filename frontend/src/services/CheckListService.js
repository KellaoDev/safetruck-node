import api from '../api/CheckListApi';

const ChecklistService = {
  async getPendingAndReleaseChecklists() {
    try {
      const response = await api.getPendingAndReleaseChecklists()
      return {
        success: true,
        message: response.data.message,
        data: response.data.data,
        metadata: response.data.meta
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Erro inesperado.' }
    }
  },

  async getReturnChecklists() {
    try {
      const response = await api.getReleaseChecklists()
      return {
        success: true,
        message: response.data.message,
        data: response.data.data,
        metadata: response.data.meta
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Erro inesperado.' }
    }
  },

  async getMaintenanceChecklists() {
    try {
      const response = await api.getMaintenanceChecklists()
      return {
        success: true,
        message: response.data.message,
        data: response.data.data,
        metadata: response.data.meta
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Erro inesperado.' }
    }
  },

  async releaseChecklist(checklist_id) {
    try {
      const response = await api.releaseChecklist(checklist_id)
      return {
        success: true,
        message: response.data.message,
        data: response.data.data,
        metadata: response.data.meta
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Erro inesperado.' }
    }
  },

  async returnChecklist(checklist_id) {
    try {
      const response = await api.returnChecklist(checklist_id)
      return {
        success: true,
        message: response.data.message,
        data: response.data.data,
        metadata: response.data.meta
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Erro inesperado.' }
    }
  },

  async create(checkListData) {
    try {
      const response = await api.create(checkListData)
      return {
        success: true,
        message: response.data.message,
        data: response.data.data,
        metadata: response.data.metadata
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Erro inesperado.' }
    }
  },

  async approveMaintenance(id, updateData) {
    try {
      const response = await api.approveMaintenance(id, updateData)
      console.log(response)
      return {
        success: true,
        message: response.data.message,
        data: response.data.data,
        metadata: response.data.meta
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Erro inesperado.' }
    }
  },
}

export default ChecklistService