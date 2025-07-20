<template>
  <v-container class="">
    <v-card>
      <v-form @submit.prevent="cargar">
        <v-file-input
          variant="solo-filled"
          class="ma-3"
          v-model="archivo"
          accept=".xlsx"
          label="Seleccionar archivo Excel"
          prepend-inner-icon="mdi-file-excel"
          required
        />
        <div class="d-flex justify-center align-center">
          <v-btn class="mb-2" type="submit" color="primary">Subir respaldo</v-btn>
        </div>
      </v-form>
    </v-card>

    <v-alert v-if="mensaje" type="success" class="mt-4">{{ mensaje }}</v-alert>
    <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
    <v-dialog v-model="this.dialogCargar" width="auto">
      <v-card max-width="400" title="Oprimiste Subir respaldo" color="warning">
        <template v-slot:text>
          ¿Seguro/a de querer subir un respaldo? La informacion de los medicamentos sera borrada y
          reestablecida con los datos que cargues
        </template>
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn class="ms-auto" text="Cancelar" @click="this.dialogCargar = false"></v-btn>
          <v-btn class="ms-auto" text="Ok" @click="subirRespaldo"></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import sofiSaludService from '@/services/sofiSaludService'

export default {
  data() {
    return {
      archivo: null,
      mensaje: '',
      error: '',
      dialogCargar: false,
    }
  },
  methods: {
    cargar() {
      this.dialogCargar = true
    },
    async subirRespaldo() {
      try {
        const formData = new FormData()
        formData.append('file', this.archivo)

        const res = await sofiSaludService.subirRespaldo(formData)
        this.mensaje = res.data.mensaje
        this.error = ''
        this.dialogCargar = false
        console.log(res)
        this.$emit('actualizar_tabla')
      } catch (error) {
        console.error('Error:', error)
        this.error = error.response?.data?.error || 'No se pudo cargar el respaldo.'
        this.mensaje = ''
        this.dialogCargar = false
      }
    },
  },
}
</script>
