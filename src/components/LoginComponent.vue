<template>
<div class="login-page">
    <!-- Logo -->
    <div class="logo">
      <img src="/src/assets/osito.png" alt="logo osito" />
      <h1>Bienvenido a la lista de nombres</h1>
      <p class="intro">Guarda y organiza tus nombres favoritos con un toque mágico ✨</p>
    </div>

    <!-- Contenedor de login / registro -->
    <div class="container-log">
      <div class="registro">
        <h2>Registro</h2>
        <input v-model="email" @keyup.enter="handleRegister" type="email" placeholder="Email" />
        <input v-model="password" @keyup.enter="handleRegister" type="password" placeholder="Password" />
        <p v-if="registerError" class="error-msg"> {{ registerError }}</p>
        <button @click="handleRegister">Registrarse</button>
      </div>
      <div class="login">
        <h2>Login</h2>
        <input v-model="loginEmail" @keyup.enter="handleLogin" type="email" placeholder="Email" />
        <input v-model="loginPassword" @keyup.enter="handleLogin" type="password" placeholder="Password" />
        <p v-if="loginError" class="error-msg"> {{ loginError }}</p>
        <button @click="handleLogin">Iniciar Sesión</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useAuth } from "@/composables/useAuth"; 
import { useRouter } from "vue-router";

const { user, register, login } = useAuth();
const router = useRouter();

const email = ref("");
const password = ref("");
const loginEmail = ref("");
const loginPassword = ref("");

const registerError = ref("");
const loginError = ref("");

async function handleRegister() {
  registerError.value = ""
  const error = await register(email.value, password.value)
  if(error){
    registerError.value = error;
  } else{ 
    email.value = "";
    password.value = "";
  }
}

async function handleLogin() {
  loginError.value = '';
  const error = await login(loginEmail.value, loginPassword.value);
  if (error){
    loginError.value = error;
  } else {
    loginEmail.value = "";
    loginPassword.value = "";
  }
}

watch(
  () => user.value,
  (u) => {
    if (u) {
      router.push("/lista");
    }
  }
)

</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  padding: 1rem;
}

.logo img {
  width: 200px;
  margin-bottom: 1rem;
}

.logo h1 {
  font-size: 2rem;
  margin: 0.5rem 0;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.intro {
  font-size: 1.1rem;
  color: #6b4e71;
  margin-bottom: 2rem;
}

.container-log {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: rgba(255, 255, 255, 0.85);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 500px;
  width: 100%;
}

.registro,
.login {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h2 {
  margin: 0;
  color: #333;
}

input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  background: linear-gradient(135deg, #feb47b, #ff7e5f);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  padding: 10px;
  transition: 0.3s;
}

button:hover {
  opacity: 0.9;
  transform: scale(1.05);
  cursor: pointer;
}

.decor-img {
  margin-top: 2rem;
}

.decor-img img {
  width: 120px;
  opacity: 0.9;
}

.error-msg {
  color: #b00020;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  font-weight: bold;
  border: 1px solid red;
  border-radius: 5px;
  padding: 0.5rem 0;
}

</style>