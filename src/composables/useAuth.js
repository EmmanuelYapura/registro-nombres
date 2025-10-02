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
      return "Ese email ya esta en uso!" 
    } else if (error.code == 'auth/invalid-email'){
      return "Ese email no es valido!" 
    } else if (error.code == 'auth/weak-password'){
      return "La contrasena debe tener minimo 6 caracteres"
    } else {
      return "Error desconocido"
    }
  }
}

async function login(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error.code == 'auth/invalid-email'){
      return 'El correo ingresado es invalido';
    } else{
      return 'Las credenciales son incorrectas';
    }
  }
}

async function logout() {
  await signOut(auth);
}

export function useAuth(){
    return { user, register, login, logout};
}
