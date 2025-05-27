<script setup>
import { ref } from 'vue';
import LoginForm from '../components/LoginComponent.vue';
import useAuth from '../composables/useAuth';
import router from '../routes/Routes.js';

const { login } = useAuth()
const error = ref(null)

const handleLogin = async (credentials) => {
  error.value = null
  const response = await login(credentials.email, credentials.password)

  if (!response.success) {
    error.value = response.message
  } else {
    await new Promise(resolve => setTimeout(resolve, 500))
    router.push('/dashboard')
  }
}
</script>

<template>
  <LoginForm @submit="handleLogin" />
  <p v-if="error" class="error-message">{{ error }}</p>
</template>

<style scoped>
.error-message {
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  padding: 12px 16px;
  background-color: #f8d7da;
  color: #842029;
  border: 1px solid #f5c2c7;
  border-radius: 8px;
  font-weight: 600;
  user-select: none;
  max-width: 300px;
  text-align: center;
  box-shadow: 0 0 5px rgba(216, 40, 36, 0.3);
}
</style>
