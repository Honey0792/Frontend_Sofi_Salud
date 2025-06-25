<template>
  <v-btn
    width="100"
    append-icon="mdi-plus"
    variant="elevated"
    class="mt-7 ml-7"
    color="#BAFFD3"
    @click="aggMedicina"
    >Añadir</v-btn
  >
  <v-dialog v-model="agregarMedicamento" transition="dialog-transition">
    <v-icon
      icon="mdi-close"
      class="position-absolute right-0"
      color="white"
      @click="this.agregarMedicamento = false"
    ></v-icon>
    <v-container class="d-flex justify-center align-center">
      <carta-añadir-medicamento />
    </v-container>
  </v-dialog>
  <v-card class="d-flex mx-10 ma-7">
    <v-data-table
      :loading="loadingConfig"
      :search="search"
      :headers="headers"
      :items="medicamentos"
      :items-length="totalItems"
      :items-per-page="itemsPerPage"
      :page="pagina"
      hide-default-footer
      height="460"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          placeholder="Buscar"
          prepend-inner-icon="mdi-magnify"
          clearable
          density="compact"
          single-line
        ></v-text-field>
      </template>
      <template v-slot:bottom>
        <div class="d-flex justify-space-between align-center px-4 pt-2">
          <v-select
            v-model="itemsPerPage"
            :items="[10, 25, 50, 100]"
            label="Filas por página"
            class="ma-0"
            density="compact"
            variant="outlined"
            style="width: 180px"
            @update:model-value="onItemsPerPageChange"
          />

          <v-pagination
            v-model="pagina"
            :length="Math.ceil(totalItems / itemsPerPage)"
            :total-visible="10"
            @update:model-value="onPageChange"
          />
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import sofiSaludService from '@/services/sofiSaludService'
import CartaAñadirMedicamento from '../Cards/cartaAñadirMedicamento.vue'

export default {
  components: {
    CartaAñadirMedicamento,
  },
  data: () => ({
    agregarMedicamento: false,
    loadingConfig: true,
    search: '',
    medicamentos: [],
    pagina: 1,
    itemsPerPage: 10,
    totalItems: 0,
    headers: [
      { title: 'Orden', value: 'id_medicamento' },
      { title: 'Nombre', value: 'nombre_medicamento' },
      { title: 'Descripción', value: 'descripcion_medicamento' },
      { title: 'Principio Activo', value: 'principo_activo_medicamento' },
      { title: 'Dosificación', value: 'dosificacion_medicamento' },
      { title: 'Laboratorio', value: 'laboratorio_medicamento' },
      { title: 'Presentación', value: 'presentacion' },
    ],
  }),
  methods: {
    aggMedicina() {
      this.agregarMedicamento = true
    },
    async obtenerMedicamentos() {
      try {
        this.loadingConfig = true
        const res = await sofiSaludService.getMedicamentos(this.pagina, this.itemsPerPage)
        console.log(res)
        this.medicamentos = res.data.datos
        this.totalItems = res.data.total_registros
        this.loadingConfig = false
      } catch (error) {
        console.error(error)
      }
    },

    onPageChange(newPage) {
      this.pagina = newPage
      this.obtenerMedicamentos()
    },

    onItemsPerPageChange(newLimit) {
      this.itemsPerPage = newLimit
      this.pagina = 1 // Reinicia a la primera página
      this.obtenerMedicamentos()
    },
  },
  mounted() {
    this.obtenerMedicamentos()
  },
}
</script>
