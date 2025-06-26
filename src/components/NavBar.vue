<template>
  <v-layout class="">
    <!-- TOOLBAR FIJA ARRIBA -->
    <v-app-bar app color="#E95820" dark>
      <!-- <v-icon class="ml-3">mdi-plus</v-icon> -->
      <v-toolbar-title>Al Servicio de tu salud</v-toolbar-title>

      <v-btn @click="cerrarSesion" icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- DRAWER LATERAL -->
    <v-navigation-drawer app expand-on-hover rail color="#116430">
      <v-list>
        <v-list-item
          prepend-avatar="../src/assets/logosofisalud.png"
          subtitle=""
          title="Farmacia Sofi Salud"
        />
      </v-list>

      <v-divider />

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home" title="Home" value="myfiles" to="/home" />
        <v-list-item v-if="esVisible"
          prepend-icon="mdi-pill-multiple"
          title="Medicamentos"
          value="shared"
          to="/medicamentos"
        />
        <v-list-item v-if="esVisible"
          prepend-icon="mdi-account-multiple"
          title="Usuarios"
          value="starred"
          to="/usuarios"
        />
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
export default {
  methods: {
    cerrarSesion() {
      sessionStorage.clear()
      this.$router.push('/').then(() => {
        this.$router.go(0)
      })
    },
  },
  computed: {
    esVisible() {
      return sessionStorage.getItem('role') === '1'
    },
  },
}
</script>
