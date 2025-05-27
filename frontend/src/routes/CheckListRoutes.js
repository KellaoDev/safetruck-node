import ChecklistView from '../views/CheckListView.vue';
import ReleaseView from '../views/ReleaseView.vue';
import ReturnView from '../views/ReturnView.vue';
import MaintenanceView from '../views/MaintenanceView.vue';
import AnalyzeView from '../views/AnalyzeView.vue';

export default [
  {
    path: '/checklists',
    name: 'checklists',
    component: ChecklistView,
    meta: { requiresAuth: true }
  },
  {
    path: '/checklists/release',
    name: 'checklists-release',
    component: ReleaseView,
    meta: { requiresAuth: true }
  },
  {
    path: '/checklists/return',
    name: 'checklists-return',
    component: ReturnView,
    meta: { requiresAuth: true }
  },
  {
    path: '/checklists/maintenance',
    name: 'checklists-maintenance',
    component: MaintenanceView,
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/checklists/analyze',
    name: 'checklists-analyze',
    component: AnalyzeView,
    meta: { requiresAuth: true },
    props: true
  },
]
