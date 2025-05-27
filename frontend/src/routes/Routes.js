import { createRouter, createWebHistory } from 'vue-router';
import authRoutes from './authRoutes.js';
import checklistRoutes from './checklistRoutes.js';

const routes = [
  ...authRoutes,
  ...checklistRoutes,
  { path: '/', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')
  const isAuthenticated = user !== null && token !== null

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
