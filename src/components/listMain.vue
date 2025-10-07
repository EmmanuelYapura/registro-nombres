<template>
  <img class="osito-img" src="/src/assets/osito.png" alt="osito">
  <h1>Bienvenido a la pagina de mi gordita</h1>
      <input v-model="nuevoNombre" @keyup.enter="agregarNombre" placeholder="Ingresa un nombre..." type="text" id="nombre" name="nombre">
      <button @click="agregarNombre" class="btn-sub">Enviar</button>
      <button @click="handleLogout" class="btn-sub">Cerrar</button>
  <h2>Nombres</h2>
  <ul>
    <li v-for="nombre in nombres" :key="nombre.id">
      <template v-if="editandoId === nombre.id">
        <input v-model="nombreEditado" @keyup.enter="guardarEdicion(nombre.id)" />
        <div class="div-options">
          <button class="btn-option" @click="guardarEdicion(nombre.id)">✔️</button>
          <button class="btn-option" @click="cancelarEdicion" >❌</button>
        </div>
      </template>
      <template v-else>
        <div class="div-name">
          {{ nombre.nombre }}
          <img src="/src/assets/bebe.png" class="icon-img" alt="icon" width="40" height="35">
        </div>
        <div class="div-options">
          <button class="btn-option" @click="editarNombre(nombre)" >✏️</button>
          <button class="btn-option" @click="eliminarNombre(nombre.id)" >🗑️</button>
        </div>
      </template>
    </li>
  </ul>
</template>

<script setup>
import { ref, watch } from 'vue';
import { db } from '../firebase';
import { collection, doc, addDoc, getDocs, deleteDoc, updateDoc }  from 'firebase/firestore';
import { useAuth } from '@/composables/useAuth';
import { useRouter } from "vue-router";

const router = useRouter();

const nuevoNombre = ref("")
const nombres = ref([])
const { user, logout } = useAuth()

const editandoId = ref(null);
const nombreEditado = ref("");

async function handleLogout() {
  await logout();
  router.push('/login');
}

async function agregarNombre(){
  if (nuevoNombre.value.trim() !== "" && user.value){
    await addDoc(collection(db, "users", user.value.uid, "nombres"), {
      nombre : nuevoNombre.value
    })
    nuevoNombre.value = "";
    await cargarNombres(user.value.uid);
  }
}

async function cargarNombres(uid){
  const querySnap = await getDocs(collection(db, "users", uid, "nombres"));
  const nombres_ordenados = querySnap.docs.map(doc => ({
    id : doc.id,
    nombre: doc.data().nombre
  })) 
  nombres.value = nombres_ordenados.sort((a, b) => a.nombre.localeCompare(b.nombre));
}

// Editar un nombre
function editarNombre(nombre) {
  editandoId.value = nombre.id;
  nombreEditado.value = nombre.nombre;
}

async function guardarEdicion(id) {
  if (nombreEditado.value.trim() !== "" && user.value) {
    const docRef = doc(db, "users", user.value.uid, "nombres", id);
    await updateDoc(docRef, { nombre: nombreEditado.value });
    editandoId.value = null;
    nombreEditado.value = "";
    await cargarNombres(user.value.uid);
  }
}

function cancelarEdicion() {
  editandoId.value = null;
  nombreEditado.value = "";
}

// Eliminar un nombre
async function eliminarNombre(id) {
  if (confirm("¿Seguro que deseas eliminar este nombre?")) {
    const docRef = doc(db, "users", user.value.uid, "nombres", id);
    await deleteDoc(docRef);
    await cargarNombres(user.value.uid);
  }
}

watch(() => user.value,
  async (newUser) => {
    if (newUser) {
      await cargarNombres(newUser.uid)
    } else {
      nombres.value = []
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.osito-img{
  background: transparent;
  width: 200px;
}

.icon-img{
  margin: 0;
  padding-left: 1rem;
}

h1 {
  font-size: 2.5em;
  color: white;
  text-shadow: 2px 2px #f9987a;
}

input {
  padding: 10px;
  border: none;
  border-radius: 8px;
  width: 220px;
  margin: 5px;
}

input::placeholder{
  font-size: 1.15em;
}

.div-options{
  display: flex;
  flex-direction: column;
}

.btn-option{
  background-color: transparent;
  border: none;
  margin: 0.1em 0;
  cursor: pointer;
}

.btn-sub{
  background: linear-gradient(135deg, #FECA94, #FEB9AC);
  border-color: #fff;
  border-radius: 8px;
  padding: 9px 10px;
  margin-right: 0.5em;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}

h2 {
  margin-top: 20px;
  color: #fff;
  text-shadow: 2px 2px #f9987a;
  font-size: 1.7em;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1em;
  max-width: 800px;
}

li {
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 8px;
  padding: 0.5em;
  border-radius: 12px;
  width: 120px;
  font-weight: bold;
  flex: 1 1 calc(45% - 10px);
}

.div-name{
  display: flex;
  align-items: center;
}

@media (max-width: 480px) {
  body {
    padding: 20px;
  }

  h1 {
    font-size: 1.8em;
  }

  input {
    width: 90%;
    max-width: 250px;
  }

  ul {
    width: 100%;
    padding: 0;
    gap: 0.5em;
  }

  li {
    flex: 1 1 calc(50% - 10px);
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  h1 {
    font-size: 2.2em;
  }

  ul {
    width: 100%;
    max-width: 600px;
    gap: 0.8em;
  }

  li {
    flex: 1 1 calc(33.3% - 10px);
  }
}

@media (min-width: 1024px) {
  ul {
    max-width: 800px;
    gap: 1.2em;
  }

  li {
    flex: 1 1 calc(25% - 10px);
  }

}
</style>
