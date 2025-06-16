<template>
  <v-app>
    <v-main>
      <v-container class="d-flex justify-center align-center" style="height: 100vh">
        <v-card
          class="pa-6"
          max-width="400"
          style="background-color: rgba(255, 255, 255, 0.8)"
          elevation="10"
        >
          <v-card-title class="text-h6 mb-4 text-center">Iniciar Sesión</v-card-title>
          <v-form @submit.prevent="">
            <v-text-field label="Usuario" prepend-inner-icon="mdi-account" required />
            <v-text-field
              label="Contraseña"
              type="password"
              prepend-inner-icon="mdi-lock"
              required
            />
            <v-btn type="submit" color="#116430" class="mt-4" block> Iniciar sesión </v-btn>
          </v-form>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
