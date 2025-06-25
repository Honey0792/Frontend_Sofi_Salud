<template>
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
  <v-card width="700" height="auto" class="rounded-lg">
    <v-container>
      <v-form ref="form" @submit.prevent="modificarMedicamento">
        <v-row>
          <v-col>
            <v-text-field
              :rules="globalRules"
              variant="solo"
              label="Nombre Medicamento"
              v-model="medicamento.nombre"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              :rules="globalRules"
              variant="solo"
              label="Principio Activo"
              v-model="medicamento.principio_activo"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              variant="solo"
              label="Descripción"
              v-model="medicamento.descripcion"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row
          ><v-col
            ><v-select
              :rules="globalRules"
              variant="solo"
              label="Clasificación"
              :items="clasificaciones"
              item-title="nombre_clasificacion"
              item-value="id_clasificacion"
              v-model="medicamento.id_clasificacion"
            ></v-select></v-col
          ><v-col
            ><v-autocomplete
              :rules="globalRules"
              :items="presentaciones"
              item-title="nombre_presentacion"
              item-value="id_presentacion"
              variant="solo"
              label="Presentación"
              v-model="medicamento.id_presentacion"
            ></v-autocomplete></v-col
        ></v-row>
        <v-row>
          <v-col>
            <v-text-field
              :rules="globalRules"
              variant="solo"
              label="Laboratorio"
              v-model="medicamento.laboratorio"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              :rules="globalRules"
              variant="solo"
              label="Dosificación"
              v-model="medicamento.dosificacion"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-btn color="success" type="submit" class="ma-3">modificar</v-btn></v-row
        >
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import sofiSaludService from '@/services/sofiSaludService'

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    alert: { show: false, message: '' },
    presentaciones: [],
    clasificaciones: [
      { id_clasificacion: 1, nombre_clasificacion: 'Leve' },
      { id_clasificacion: 2, nombre_clasificacion: 'Moderada' },
      { id_clasificacion: 3, nombre_clasificacion: 'Alta' },
    ],
    medicamento: {
      id: null,
      nombre: null,
      descripcion: null,
      principio_activo: null,
      id_clasificacion: null,
      id_presentacion: null,
      dosificacion: null,
      laboratorio: null,
    },
    globalRules: [(value) => !!value || 'Requerido'],
  }),
  methods: {
    async obtenerPresentaciones() {
      try {
        const res = await sofiSaludService.getSelectPresentacion()
        this.presentaciones = res.data.datos
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },

    async obtenerMedicamentoById() {
      try {
        const res = await sofiSaludService.getMedicamentosById(this.id)
        console.log(res)
        const datosApi = res.data
        this.medicamento.id = datosApi.id
        this.medicamento.nombre = datosApi.nombre
        this.medicamento.descripcion = datosApi.descripcion
        this.medicamento.principio_activo = datosApi.principio_activo
        this.medicamento.id_clasificacion = datosApi.clasificacion.id
        this.medicamento.id_presentacion = datosApi.presentacion.id
        this.medicamento.laboratorio = datosApi.laboratorio
        this.medicamento.dosificacion = datosApi.dosificacion
      } catch (error) {
        console.log(error)
      }
    },

    async modificarMedicamento() {
      const { valid } = await this.$refs.form.validate()

      if (!valid) {
        this.alert = {
          show: true,
          color: 'warning',
          message: 'Complete todos los campos requeridos',
        }
        return
      }
      try {
        const res = await sofiSaludService.putMedicamento(this.medicamento)
        this.alert = {
          show: true,
          color: 'success',
          message: 'Medicamento editado correctamente.',
        }
        this.$emit('actualizar_tabla')
      } catch (error) {
        const msjError = error.response.data.mensaje
        this.alert = {
          show: true,
          color: 'warning',
          message: msjError,
        }
        console.log(error)
      }
    },
  },
  mounted() {
    this.obtenerMedicamentoById()
    this.obtenerPresentaciones()
  },
}
</script>
