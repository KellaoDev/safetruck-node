<script setup>
import { ref, onMounted } from 'vue';
import useChecklist from '../composables/useChecklist.js';
import EditMaintenanceModal from './MaintenanceModalComponent.vue';

const { checklists, getMaintenanceChecklists, loading, error } = useChecklist()
const userName = ref('')
const selectedChecklist = ref(null)
const showModal = ref(false)

onMounted(() => {
  getMaintenanceChecklists()
  const user = JSON.parse(localStorage.getItem('user'))
  if (user && user.username) {
    userName.value = user.username
  }
})

const openModal = (item) => {
  selectedChecklist.value = item
  showModal.value = true
}

const closeModal = () => {
  selectedChecklist.value = null
  showModal.value = false
}

const onUpdated = () => {
  getMaintenanceChecklists()
  closeModal()
}
</script>

<template>
  <div class="dashboard">
    <div class="card">
      <h2>Caminhões em Manutenção</h2>
    </div>

    <div v-if="loading">Carregando...</div>
    <div v-else-if="error">Erro: {{ error }}</div>
    <div v-else>
      <h2>Seus Checklists em Manutenção</h2>

      <div v-if="checklists.length === 0">
        <p>Nenhum checklist encontrado.</p>
      </div>

      <ul>
        <li v-for="item in checklists" :key="item.id" class="checklist-item">
          <p><strong>Nome do motorista:</strong> {{ item.username }}</p>
          <p><strong>Faróis:</strong> {{ item.headlights ? 'Faróis verificados - OK' : 'Faróis com pendência' }}</p>
          <p><strong>Freios:</strong> {{ item.brakes ? 'Freios verificados - OK' : 'Freios com pendência' }}</p>
          <p><strong>Pneus:</strong> {{ item.tires ? 'Pneus verificados - OK' : 'Pneus com pendência' }}</p>
          <p><strong>Status:</strong> {{ item.status === 'pending' ? 'Aguardando aprovação' : item.status ===
            'maintenance' ? 'Aguardando manutenção' : item.status }}</p>

          <button class="button" @click="openModal(item)">Editar e Aprovar</button>
        </li>
      </ul>
    </div>

    <EditMaintenanceModal v-if="showModal" :checklist="selectedChecklist" @close="closeModal" @updated="onUpdated" />

    <button class="button-back" type="button" @click="$router.go(-1)">Voltar</button>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');

body {
  background-color: #d6d6d6;
}

.card {
  background-color: #e3e3e3;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dashboard {
  padding: 40px;
  color: #c91804;
  font-family: "Open Sans", sans-serif;
}

.button {
  border-radius: 20px;
  border: none;
  width: 10%;
  height: 30px;
  font-size: 15px;
  background-color: #c91804;
  color: #fff;
  display: block;
  cursor: pointer;
  font: bolder;
  user-select: none;
  transition: all 0.3s ease;
}

.button-back {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #c91804;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.checklist-item {
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  list-style: none;
}

::-webkit-scrollbar {
  width: 8px;
  background-color: #d6d6d6;
}

::-webkit-scrollbar-thumb {
  background-color: #c91804;
  border-radius: 10px;
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
}
</style>
