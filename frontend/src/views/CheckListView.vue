<script setup>
import { ref } from 'vue';
import ChecklistForm from '../components/CheckListComponent.vue';
import useChecklist from '../composables/useChecklist';
import router from '../routes/Routes.js';


const { createChecklist } = useChecklist()
const error = ref(null)

const handleSubmit = async (formData) => {
  error.value = null;
  const response = await createChecklist(formData)

  if (!response.success) {
    error.value = response.message
  } else {
    await new Promise(resolve => setTimeout(resolve, 500))
    router.push('/dashboard')
  }
}
</script>

<template>
  <ChecklistForm @submit="handleSubmit" />
  <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
</template>
