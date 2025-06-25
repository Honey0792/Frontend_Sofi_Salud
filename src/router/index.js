import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true, allowedRoles: ["1", "2"] },
    },
    {
      path: '/medicamentos',
      name: 'Medicamentos',
      component: () => import('../views/MedicamentosView.vue'),
      meta: { requiresAuth: true, allowedRoles: ["1"] },
    },
    {
      path: '/usuarios',
      name: 'Usuarios',
      component: () => import('../views/UsuariosView.vue'),
      meta: { requiresAuth: true, allowedRoles: ["1"] },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem('token')
  const userRole = sessionStorage.getItem('role')

  // Redirigir usuarios autenticados que intenten volver al login
  if (isAuthenticated && to.name === 'Login') {
    return next('/home')
  }

  // Validar rutas protegidas
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      return next('/')
    }

    // Validar roles si existen restricciones
    if (to.meta.allowedRoles) {
      if (!to.meta.allowedRoles.includes(userRole)) {
        return next('/home') // o ruta de acceso denegado
      }
    }
  }

  next()
})

export default router
