<template>
  <NavBar v-if="!isLoginPage" />
  <v-app :class="!isLoginPage ? 'ml-14 mt-16' : ''">
    <RouterView />
  </v-app>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import NavBar from './components/NavBar.vue'

export default {
  components: {
    Header,
    NavBar,
  },
  data: () => ({}),
  computed: {
    // Computed property para verificar si la ruta actual es 'login'
    isLoginPage() {
      return this.$route.name === 'Login'
    },
  },
}
</script>
