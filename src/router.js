import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from './components/LoginComponent.vue'
import ListMain from './components/listMain.vue'
import { useAuth } from './composables/useAuth'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginComponent },
  { path: '/lista', component: ListMain, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Protección de rutas
router.beforeEach((to) => {
  const { user } = useAuth()
  const isLoggedIn = user.value
  
  if (to.meta.requiresAuth && !isLoggedIn) {
    return '/login'
  }
  if (to.path === '/login' && isLoggedIn) {
    return '/lista'
  }
})

export default router
