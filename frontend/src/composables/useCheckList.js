import { useChecklistStore } from '../stores/CheckListStore';
import { computed } from 'vue';

export default function useChecklist() {
  const checklistStore = useChecklistStore()

  return {
    checklists: computed(() => checklistStore.checklists),
    loading: computed(() => checklistStore.loading),

    getPendingAndReleaseChecklists: checklistStore.getPendingAndReleaseChecklists,
    getReturnChecklists: checklistStore.getReturnChecklists,
    getMaintenanceChecklists: checklistStore.getMaintenanceChecklists,
    releaseChecklist: checklistStore.releaseChecklist,
    returnChecklist: checklistStore.returnChecklist,
    createChecklist: checklistStore.createChecklist,
    approveMaintenance: checklistStore.approveMaintenance,
  }
}