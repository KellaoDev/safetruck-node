<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['submit'])

const form = ref({
  cpf: '',
  username: '',
  email: '',
  password: '',
  role: 'user'
})

function maskCPF(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

watch(() => form.value.cpf, (newVal) => {
  form.value.cpf = maskCPF(newVal)
})

const handleSubmit = async () => {
  emit('submit', form.value)
}
</script>

<template>
  <div class="container">
    <div class="box">
      <h1>Cadastro</h1>
      <form @submit.prevent="handleSubmit">
        <div class="formDate">
          <label>CPF:</label>
          <input v-model="form.cpf" type="text" maxlength="14" required />
        </div>
        <div class="formDate">
          <label>Nome de Usuário:</label>
          <input v-model="form.username" type="text" required />
        </div>
        <div class="formDate">
          <label>Email:</label>
          <input v-model="form.email" type="email" required />
        </div>
        <div class="formDate">
          <label>Senha:</label>
          <input v-model="form.password" type="password" required />
        </div>
        <div class="formDate">
          <label>Perfil:</label>
          <select v-model="form.role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="button" @click="$router.go(-1)">Voltar</button>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins&display=swap');

body {
  background: linear-gradient(to right, #d6d6d6, #c2c2c2, #a1a1a1);
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}

.box {
  background-color: whitesmoke;
  margin: auto;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  font-family: "Inter", sans-serif;
  box-shadow: 0px 0px 10px 10px #bababa;
  justify-content: center;
}

h1 {
  color: #c91804;
  font-size: 38px;
  user-select: none;
}

button {
  border-radius: 20px;
  border: none;
  width: 80%;
  height: 30px;
  font-size: 15px;
  background-color: #c91804;
  color: #fff;
  display: block;
  margin: 20px auto;
  cursor: pointer;
  font: bolder;
  user-select: none;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #870f01;
  transform: scale(1.05);
}

input,
select {
  background-color: #d1d1d1;
  border-radius: 8px;
  height: 25px;
  width: 220px;
  border: none;
  margin-top: 5px;
}

.formDate {
  margin: 20px;
  font-size: 20px;
  outline: none;
  color: #c91804;
  font-weight: bolder;
  user-select: none;
  display: flex;
  flex-direction: column;
}
</style>
