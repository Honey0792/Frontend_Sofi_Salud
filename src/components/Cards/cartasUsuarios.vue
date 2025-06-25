<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex" v-for="cards in usuarios" :key="cards.id_usuario">
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
            {{ cards.nombre_usuario }}
          </template>
          <template v-slot:subtitle>
            {{ cards.nombre_empleado }}
            {{ cards.apellido_empleado }}
          </template>
          <template v-slot:prepend>
            <v-icon color="primary" icon="mdi-account"></v-icon>
          </template>
          <template v-slot:actions>
            <v-spacer></v-spacer>
            <v-btn
              variant="outlined"
              size="small"
              color="#00ACC1"
              >Modificar</v-btn
            >
            <v-btn
              variant="outlined"
              size="small"
              color="#E65100"
              v-if="cards.nombre_usuario != 'admin'"
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
  <v-dialog v-model="dialog_1">
    <v-icon
      icon="mdi-close"
      class="position-absolute right-0"
      color="white"
      @click="this.dialog_1 = false"
    ></v-icon>
    <!-- <CartaEditUsuario :id="id" /> -->
  </v-dialog>

  <v-dialog v-model="this.dialog_2" width="auto">
    <v-card
      max-width="400"
      prepend-icon="mdi-delete-alert"
      text="¿Estas Seguro/a de querer eliminar a este Usuario?"
      title="Oprimiste eliminar"
      color="warning"
    >
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn class="ms-auto" text="Cancelar" @click="this.dialog_2 = false"></v-btn>
        <v-btn class="ms-auto" text="Ok" @click=""></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    usuarios: [{ id_usuario: 1, nombre_empleado:"admin", apellido_empleado:"admin", nombre_usuario:"admin" }],
  }),
}
</script>
