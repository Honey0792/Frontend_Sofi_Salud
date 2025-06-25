<template>
  <!-- <v-row class="mt-6" justify="center">
    <v-col cols="3" md="3">
      <v-img
      src="../../src/assets/Logo_Farmacia.jpg"
      alt="Dashboard Illustration"
      height=""
      cover
      class="rounded-lg"
      />
    </v-col>
  </v-row> -->

  <v-app>
    <v-main>
      <v-container fluid style="height: 100vh" class="d-flex justify-center align-center kbg">
        <v-card class="pa-8" max-height="350" variant="flat" elevation="7">
          <v-form>
            <v-row>
              <v-col
                ><v-text-field
                  variant="solo-filled"
                  label="Edad"
                  type="number"
                  v-model="consulta.edad"
                ></v-text-field
              ></v-col>
              <v-col
                ><v-select
                  variant="solo-filled"
                  :items="generos"
                  item-title="nombre_genero"
                  item-value="nombre_genero"
                  label="Sexo"
                  v-model="consulta.genero"
                ></v-select
              ></v-col>
            </v-row>
            <v-row>
              <v-textarea
                no-resize
                width="600"
                label="Escriba los sintomas del cliente para una recomendacion"
                variant="solo-filled"
                v-model="consulta.mensaje"
              ></v-textarea>
            </v-row>
            <v-row class="d-flex justify-center">
              <v-btn color="#116430" @click="recomendacion"> Consultar</v-btn>
            </v-row>
          </v-form>
        </v-card>
      </v-container>

      <v-dialog v-model="dialog">
        <v-icon
          icon="mdi-close"
          class="position-absolute right-0"
          color="white"
          @click="this.dialog = false"
        ></v-icon>
        <v-container class="d-flex justify-center align-center">
          <cartaRecomendacion :prompt="consulta" />
        </v-container>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import CartaRecomendacion from '@/components/Cards/cartaRecomendacion.vue'

export default {
  components: { CartaRecomendacion },
  data: () => ({
    dialog: false,
    generos: [{ nombre_genero: 'Masculino' }, { nombre_genero: 'Femenino' }],
    consulta: {
      edad: null,
      mensaje: null,
      genero: null,
    },
  }),

  methods: {
    recomendacion() {
      this.dialog = true
    },
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
