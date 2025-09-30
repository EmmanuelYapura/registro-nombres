import { ref } from "vue";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'

const user = ref(null);

onAuthStateChanged(auth, (u) => {
  user.value = u;
});

async function register(email, password) {
  try{
    await createUserWithEmailAndPassword(auth, email, password);
  } catch(error){
    if(error.code == 'auth/email-already-in-use'){
      console.warn("Ese email ya esta en uso!")
    } else if (error.code == 'auth/invalid-email'){
      console.warn("Ese email no es valido!")
    } else if (error.code == 'auth/weak-password'){
      console.warn("La contrasena debe tener minimo 6 caracteres")
    } else {
      console.error("Error desconocido", error)
    }
  }
}

async function login(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error.code == 'auth/invalid-email'){
      console.log("El correo ingresado es invalido")
    } else{
      console.log("Las credenciales son incorrectas")
    }
  }
}

/* Esto no necesita mucha validacion ya que solo aparecera cuando un user este logeado */
async function logout() {
  await signOut(auth);
}

export function useAuth(){
    return { user, register, login, logout};
}
