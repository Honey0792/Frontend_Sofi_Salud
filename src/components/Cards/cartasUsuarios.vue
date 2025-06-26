<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex" v-for="cards in usuarios" :key="cards.id_user">
        <v-card variant="elevated" width="400">
          <!-- <v-card-title>
            <v-icon color="primary" icon="mdi-account"></v-icon
            >{{ cards.nombre_usuario }}</v-card-title
          >
          <v-card-subtitle
            >{{ cards.nombre_persona }}
            {{ cards.apellido_persona }}</v-card-subtitle
          > -->
          <template v-slot:title>
            {{ cards.user_user }}
          </template>
          <template v-slot:subtitle> </template>
          <template v-slot:prepend>
            <v-icon color="primary" icon="mdi-account"></v-icon>
          </template>
          <template v-slot:actions>
            <v-spacer></v-spacer>
            <v-btn variant="outlined" size="small" color="#00ACC1" @click="editar(cards.id_user)"
              >Modificar</v-btn
            >
            <v-btn
              variant="outlined"
              size="small"
              color="#E65100"
              @click="eliminar(cards.id_user, cards.user_user)"
              v-if="cards.user_user != 'admin'"
              >Eliminar</v-btn
            >
          </template>
          <!-- <template v-slot:append>
          <v-icon color="success" icon="mdi-check"></v-icon>
        </template> -->
          <!-- <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</v-card-text> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialogEditar">
    <v-icon
      icon="mdi-close"
      class="position-absolute right-0"
      color="white"
      @click="this.dialogEditar = false"
    ></v-icon>
    <CartaEditUsuario @actualizar_tabla="obtenerUsuarios" :id="id_user" />
  </v-dialog>

  <v-dialog v-model="this.dialogEliminar" width="auto">
    <v-card
      max-width="400"
      prepend-icon="mdi-delete-alert"
      title="Oprimiste eliminar"
      color="warning"
    >
      <template v-slot:text>
        ¿Estas seguro/a de querer eliminar a {{ this.nombre_user }}?
      </template>
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn class="ms-auto" text="Cancelar" @click="this.dialogEliminar = false"></v-btn>
        <v-btn class="ms-auto" text="Ok" @click="eliminarUsuario"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
import sofiSaludService from '@/services/sofiSaludService'
import CartaEditUsuario from './cartaEditUsuario.vue'

export default {
  components: {
    CartaEditUsuario,
  },
  data: () => ({
    nombre_user: null,
    id_user: null,
    dialogEditar: false,
    dialogEliminar: false,
    usuarios: [],
  }),
  methods: {
    async obtenerUsuarios() {
      try {
        const res = await sofiSaludService.getUsuarios()
        console.log(res)
        this.usuarios = res.data.datos
      } catch (error) {
        console.log(error)
      }
    },

    editar(id) {
      this.id_user = id
      this.dialogEditar = true
    },

    eliminar(id, nombre) {
      this.id_user = id
      this.nombre_user = nombre
      this.dialogEliminar = true
    },
    async eliminarUsuario() {
      try {
        const res = await sofiSaludService.deleteUsuario(this.id_user)
        this.dialogEliminar = false
        this.obtenerUsuarios()
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    this.obtenerUsuarios()
  },
}
</script>
