<script setup>
import { ref, onMounted, computed } from 'vue';
import useChecklist from '../composables/useChecklist.js';
import router from '../routes/Routes.js';

const { checklists, getPendingAndReleaseChecklists, releaseChecklist, loading } = useChecklist()
const userName = ref('')

onMounted(() => {
  getPendingAndReleaseChecklists()
  const user = JSON.parse(localStorage.getItem('user'))
  if (user && user.username) {
    userName.value = user.username
  }
})

const released = async (id) => {
  await releaseChecklist(id)
  await getPendingAndReleaseChecklists()
}

const edit = async (item) => {
  router.push({ name: 'checklists-maintenance', params: { id: item.id } })
}

const filteredChecklists = computed(() => {
  return checklists.value.filter(item =>
    item.status === 'pending' || item.status === 'maintenance'
  )
})
</script>

<template>
  <div class="dashboard">
    <div class="card">
      <h2>Caminhões Liberados</h2>
    </div>

    <div v-if="loading">Carregando...</div>
    <div v-else>
      <h2>Seus Checklists</h2>

      <div v-if="filteredChecklists.length === 0">
        <p>Nenhum checklist encontrado.</p>
      </div>

      <ul>
        <li v-for="item in filteredChecklists" :key="item.id" class="checklist-item">
          <p><strong>Nome do motorista:</strong> {{ item.username }}</p>
          <p><strong>Placa:</strong> {{ item.plates }}</p>
          <p><strong>Faróis:</strong> {{ item.headlights ? 'Faróis verificados - OK' : 'Faróis com pendência' }}</p>
          <p><strong>Freios:</strong> {{ item.brakes ? 'Freios verificados - OK' : 'Freios com pendência' }}</p>
          <p><strong>Pneus:</strong> {{ item.tires ? 'Pneus verificados - OK' : 'Pneus com pendência' }}</p>
          <p><strong>Status:</strong> {{ item.status === 'pending' ? 'Aguardando aprovação' : item.status ===
            'maintenance' ? 'Em manutenção' : item.status }}</p>
          <p><strong>Data de criação:</strong> {{ new Date(item.date_checklist).toLocaleString() }}</p>

          <button class="button" v-if="item.status === 'pending'" @click="released(item.id)">
            Liberar Checklist
          </button>
          <button class="button" v-if="item.status === 'maintenance'" @click="edit(item)">
            Enviar a Manutenção
          </button>
        </li>
      </ul>
    </div>

    <button class="button-back" @click="router.go(-1)">Voltar</button>
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
