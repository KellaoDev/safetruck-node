import { useAuthStore } from '../stores/AuthStore';
import { computed } from 'vue';

export default function useAuth() {
  const authStore = useAuthStore()

  return {
    user: computed(() => authStore.user),
    token: computed(() => authStore.token),
    isAuthenticated: computed(() => authStore.isAuthenticated),

    create: authStore.create,
    login: authStore.login,
    logout: authStore.logout
  }
}