<script setup>
import { ref } from 'vue';

const emit = defineEmits(['submit'])

const form = ref({
  plates: '',
  headlights: false,
  brakes: false,
  tires: false
})

const error = ref(null)

const formatPlate = (event) => {
  let value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')

  if (value.length <= 7) {
    const newFormat = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/.test(value)

    if (!newFormat && value.length > 3) {
      value = value.slice(0, 3) + '-' + value.slice(3)
    }
  }

  form.value.plates = value
}

const handleSubmit = () => {
  emit('submit', form.value)
}
</script>

<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <h1>Preencher Checklist</h1>

      <div class="card">
        <div class="items">
          <label class="plate">Placa do Caminhão:</label>
          <input class="plate-input" v-model="form.plates" @input="formatPlate" maxlength="8" required />
        </div>

        <div class="box">
          <div class="items">
            <div class="item">
              <label>
                <input type="checkbox" v-model="form.brakes" />
                Freios
              </label>
            </div>
          </div>
          <div class="items">
            <div class="item">
              <label>
                <input type="checkbox" v-model="form.headlights" />
                Faróis
              </label>
            </div>
          </div>
          <div class="items">
            <div class="item">
              <label>
                <input type="checkbox" v-model="form.tires" />
                Pneus
              </label>
            </div>
          </div>
        </div>
      </div>

      <p v-if="error" class="error">{{ error }}</p>

      <button class="button-back" type="button" @click="$router.go(-1)">Voltar</button>
      <button class="button" type="submit">Cadastrar</button>
    </form>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');

body {
  background-color: #d6d6d6;
}

.container {
  display: flex;
  justify-content: center;
}

h1 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #c91804;
  border-radius: 20px;
  font-family: "Open Sans", sans-serif;
  color: white;
  user-select: none;
  padding: 20px;
  margin-bottom: 20px;
}

label {
  font-weight: bolder;
}

input[type="text"],
input[type="checkbox"],
input[type="input"] {
  background-color: #ebebeb;
  border: none;
  border-radius: 8px;
}

.items {
  justify-content: center;
  align-items: center;
  font-size: 20px;
  user-select: none;
  color: #c91804;
  font-family: "Open Sans", sans-serif;
  margin: 20px;
}

.card {
  background-color: #e3e3e3;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.box {
  text-align: center;
}

.item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  user-select: none;
  color: #c91804;
  font-family: "Open Sans", sans-serif;
}

.plate {
  width: 500px;
  margin: 8px;
}

.plate-input {
  width: 250px;
  height: 25px;
}

.button {
  border-radius: 20px;
  border: none;
  width: 25%;
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

.button:hover {
  background-color: #870f01;
  transform: scale(1.05);
  color: white;
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

.error {
  color: red;
  margin-top: 10px;
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
