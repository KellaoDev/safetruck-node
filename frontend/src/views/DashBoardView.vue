<script setup>
import { useRouter } from 'vue-router';
import useAuth from '../composables/useAuth';

const router = useRouter()
const { user, logout } = useAuth()

const navigateTo = (routeName) => {
  router.push({ name: routeName })
}

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>

<template>
  <div class="page-wrapper">
    <div class="container">
      <h1>Bem-vindo ao SafeTruck</h1>

      <ul>
        <li><button @click="navigateTo('checklists')">Preencher Checklist</button></li>
      </ul>
      <ul>
        <li><button v-if="user.role === 'admin'" @click="navigateTo('checklists-release')">Liberação de
            Caminhões</button></li>
      </ul>
      <ul>
        <li><button v-if="user.role === 'admin'" @click="navigateTo('checklists-return')">Retorno de Caminhões</button>
        </li>
      </ul>
      <ul>
        <li><button v-if="user.role === 'admin'" @click="navigateTo('checklists-maintenance')">Manutenção</button></li>
      </ul>
      <ul>
        <li><button v-if="user.role === 'admin'" @click="navigateTo('checklists-analyze')">Análise de
            Checklists</button></li>
      </ul>
      <ul>
        <li><button v-if="user.role === 'admin'" @click="navigateTo('register')">Cadastro de Usuários</button></li>
      </ul>

      <button class="button-logout" @click="handleLogout">Sair</button>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #d6d6d6, #c2c2c2, #a1a1a1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 5%;
  background-color: whitesmoke;
  width: 35%;
  border-radius: 30px;
  box-shadow: 0px 0px 10px 10px #bababa;
}

h1 {
  margin-top: -50px;
  color: #c91804;
  user-select: none;
  font-family: "Open Sans", sans-serif;
}

.button-logout {
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

button {
  border-radius: 20px;
  padding: 10px;
  text-align: center;
  border: none;
  width: 250px;
  height: 50px;
  font-size: 20px;
  text-decoration: none;
  margin-top: 20px;
  font-family: "Open Sans", sans-serif;
  color: white;
  background-color: #c91804;
  cursor: pointer;
}

ul {
  padding: 0;
}

li {
  list-style: none;
}

button:hover {
  background-color: #870f01;
  scale: 105%;
  color: white;
}
</style>
