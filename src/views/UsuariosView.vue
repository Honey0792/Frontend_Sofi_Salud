<template>
  <v-app class="kbg">
    <v-tabs v-model="tab">
      <v-tab @click="refrescarUsuarios" value="one">Usuarios</v-tab>
      <v-tab value="two">Registrar</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="one">
        <cartasUsuario ref="hijo" />
      </v-tabs-window-item>

      <v-tabs-window-item value="two"> </v-tabs-window-item>
    </v-tabs-window>
  </v-app>
</template>

<script>
import cartasUsuario from '@/components/Cards/cartasUsuarios.vue'
export default {
  components: {
    cartasUsuario,
  },
  data: () => ({
    tab: null,
  }),
  methods: {
    // refrescarUsuarios(){
    //   this.$refs.hijo.obtenerUsuarios()
    // }
  },
}
</script>
<style scoped>
.kbg {
  background-image: url(../assets/Fondo.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
