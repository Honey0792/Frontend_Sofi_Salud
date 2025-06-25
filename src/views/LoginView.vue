<template>
  <Header />
  <v-dialog v-model="alert.show" width="auto" class="justify-center align-center">
    <v-alert
      v-model="alert.show"
      :color="alert.color"
      variant="elevated"
      prominent
      closable
      width="400px"
      >{{ alert.message }}</v-alert
    >
  </v-dialog>
  <v-app>
    <v-main>
      <v-container fluid style="height: 100vh" class="d-flex justify-center align-center kbg">
        <v-card class="pa-8" max-width="400" elevation="10">
          <v-card-title class="text-h6 mb-4 text-center">Iniciar Sesión</v-card-title>
          <v-form @submit.prevent="login">
            <v-text-field
              label="Usuario"
              prepend-inner-icon="mdi-account"
              :rules="usernameRules"
              v-model="user.usuario"
            />
            <v-text-field
              label="Contraseña"
              type="password"
              prepend-inner-icon="mdi-lock"
              :rules="contrasenaRules"
              v-model="user.password"
            />
            <v-btn type="submit" color="#116430" class="mt-4" block> Iniciar sesión </v-btn>
          </v-form>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue'
import sofiSaludService from '@/services/sofiSaludService'

export default {
  components: {
    Header,
  },

  data: () => ({
    dialog: false,
    visible: false,
    loading: false,
    alert: { show: false, message: '' },
    user: {
      usuario: '',
      password: '',
    },
    usernameRules: [
      (value) => !!value || 'Éste campo es requerido',
      (value) =>
        !value.includes(' ') || 'El nombre de usuario no puede contener espacios en blanco',
      (value) => /^[A-Za-z\s.\d]+$/.test(value) || 'No se permiten caracteres especiales',
      (value) =>
        value.length <= 14 || 'El nombre de usuario no puede contener más de 14 caracteres',
      (value) =>
        value.length >= 4 || 'El nombre de usuario no puede contener menos de 4 caracteres',
    ],
    contrasenaRules: [
      (value) => !!value || 'La contrasena es requerida',
      (value) => !value.includes(' ') || 'La contraseña no puede contener espacios',
      (value) =>
        /^[a-zA-Z0-9\._-]*$/.test(value) ||
        'La contraseña solo puede contener letras, números, guiones bajos y puntos',
      (value) => value.length <= 14 || 'La contraseña no puede tener más de 18 caracteres',
      (value) => value.length >= 4 || 'La contraseña no puede tener menos de 4 caracteres',
    ],
  }),
  methods: {
    async login() {
      try {
        const res = await sofiSaludService.userLog(this.user)
        const token = res.data.token
        const role = res.data.role
        console.log(res) // Asegúrate de que tu API retorne el token en esta propiedad
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('role', role)
        console.log(res)
        this.$router.push('/home')
      } catch (error) {
        this.alert = {
          show: true,
          color: 'warning',
          message: 'Error al iniciar sesión. Verifica tus credenciales.',
        }
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
.kbg {
  background-image:
    linear-gradient(45deg, rgba(2, 0, 36, 0.2), rgba(13, 2, 26, 0.5)), url(../assets/fondo_login.jpeg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
