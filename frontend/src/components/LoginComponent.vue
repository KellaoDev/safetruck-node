<script setup>
import { ref } from 'vue';

const emit = defineEmits(['submit'])

const form = ref({
  email: '',
  password: ''
})

const error = ref(null)

const handleSubmit = async () => {
  emit('submit', form.value)
}
</script>

<template>
  <div class="container">
    <div class="box">
      <h1>Login</h1>
      <form @submit.prevent="handleSubmit">
        <div class="formDate">
          <label for="email">E-mail:</label>
          <input id="email" v-model="form.email" type="email" required />
        </div>
        <div class="formDate">
          <label for="password">Senha:</label>
          <input id="password" v-model="form.password" type="password" required />
        </div>
        <button type="submit">Login</button>
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
  width: 30%;
  padding: 2rem;
  border-radius: 20px;
  font-family: "Inter", sans-serif;
  box-shadow: 0 0 10px 10px #bababa;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  color: #c91804;
  font-size: 38px;
  user-select: none;
  margin-bottom: 1.5rem;
}

.formDate {
  margin: 15px 0;
  width: 100%;
  font-size: 18px;
  color: #c91804;
  font-weight: bolder;
  user-select: none;
  display: flex;
  flex-direction: column;
}

input {
  background-color: #d1d1d1;
  border-radius: 8px;
  height: 35px;
  width: 100%;
  border: none;
  padding: 0 10px;
  font-size: 16px;
  margin-top: 5px;
}

button {
  border-radius: 20px;
  border: none;
  width: 100%;
  height: 40px;
  font-size: 18px;
  background-color: #c91804;
  color: #fff;
  margin-top: 25px;
  cursor: pointer;
  font-weight: bolder;
  user-select: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #870f01;
  transform: scale(1.05);
  color: white;
}

.text-red-500 {
  color: #e3342f;
  margin-top: 10px;
}
</style>
