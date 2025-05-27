import { defineStore } from 'pinia'
import ChecklistService from '../services/ChecklistService.js'

export const useChecklistStore = defineStore('checklist', {
  state: () => ({
    checklists: [],
    loading: false,

  }),

  actions: {
    async getPendingAndReleaseChecklists() {
      this.loading = true

      try {
        const response = await ChecklistService.getPendingAndReleaseChecklists()
        if (response.success) {
          this.checklists = response.data
        }
        return response
      } catch (error) {
        error = error.message || 'Erro inesperado.'
      } finally {
        this.loading = false
      }
    },

    async getReturnChecklists() {
      this.loading = true
      try {
        const response = await ChecklistService.getReturnChecklists()
        if (response.success) {
          this.checklists = response.data
        }
        return response
      } catch (error) {
        error = error.message || 'Erro inesperado.'
      } finally {
        this.loading = false
      }
    },

    async getMaintenanceChecklists() {
      this.loading = true

      try {
        const response = await ChecklistService.getMaintenanceChecklists()
        if (response.success) {
          this.checklists = response.data
        }
        return response
      } catch (error) {
        error = error.message || 'Erro inesperado.'
      } finally {
        this.loading = false
      }
    },

    async releaseChecklist(checklist_id) {
      this.loading = true
      try {
        const response = await ChecklistService.releaseChecklist(checklist_id)
        if (response.success) {
          const index = this.checklists.findIndex(c => c.id === checklist_id)
          if (index !== -1) {
            this.checklists[index].status = 'released'
          }
          return response
        } else {
          this.error = response.message
        }
      } catch (error) {
        error = error.message || 'Erro inesperado.'
      } finally {
        this.loading = false
      }
    },

    async returnChecklist(checklist_id) {
      this.loading = true
      try {
        const response = await ChecklistService.returnChecklist(checklist_id)
        if (response.success) {
          const index = this.checklists.findIndex(c => c.id === checklist_id)
          if (index !== -1) {
            this.checklists[index].status = 'return'
          }
        } else {
          this.error = response.message
        }
      } catch (error) {
        error = error.message || 'Erro inesperado.'
      } finally {
        this.loading = false
      }
    },

    async createChecklist(checklistData) {
      this.loading = true
      try {
        const user = JSON.parse(localStorage.getItem('user'))

        const formDate = {
          ...checklistData,
          user_id: user.id
        }

        const response = await ChecklistService.create(formDate)
        if (response.success) {
          this.checklists.push(response.data)
        }

        return response
      } catch (error) {
        error = error.message || 'Erro inesperado.'
      } finally {
        this.loading = false
      }
    },

    async approveMaintenance(id, updateData) {
      this.loading = true

      try {
        const response = await ChecklistService.approveMaintenance(id, updateData)
        return response
      } catch (error) {
        error = error.message || 'Erro inesperado.'
      } finally {
        this.loading = false
      }
    },
  },
})