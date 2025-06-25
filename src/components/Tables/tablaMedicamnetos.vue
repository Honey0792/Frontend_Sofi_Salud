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
      <carta-añadir-medicamento @actualizar_tbla="obtenerMedicamentos" />
    </v-container>
  </v-dialog>
  <v-card class="d-flex mx-10 ma-7">
    <v-data-table
      :loading="loadingConfig"
      :headers="headers"
      :items="medicamentos"
      :items-length="totalItems"
      :items-per-page="itemsPerPage"
      :page="pagina"
      hide-default-footer
      height="460"
    >
      <template v-slot:top>
        <v-text-field v-model="search" placeholder="Buscar" clearable density="compact" single-line>
          <template v-slot:prepend-inner>
            <v-icon @click="buscar">mdi-magnify</v-icon>
          </template>
        </v-text-field>
      </template>
      <template v-slot:bottom>
        <div class="d-flex justify-space-between align-center px-4 pt-2">
          <v-select
            v-if="!isSearching"
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
            v-if="!isSearching"
            v-model="pagina"
            :length="Math.ceil(totalItems / itemsPerPage)"
            :total-visible="10"
            @update:model-value="onPageChange"
          />
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon
            color="medium-emphasis"
            icon="mdi-pencil"
            size="small"
            @click="editar(item.id_medicamento)"
          ></v-icon>
          <v-icon
            color="medium-emphasis"
            icon="mdi-delete"
            size="small"
            @click="eliminar(item.id_medicamento, item.nombre_medicamento)"
          ></v-icon>
        </div>
      </template>
    </v-data-table>
  </v-card>
  <v-dialog v-model="this.dialogEditar">
    <v-icon
      icon="mdi-close"
      class="position-absolute right-0"
      color="white"
      @click="this.dialogEditar = false"
    ></v-icon>
    <v-container class="d-flex justify-center align-center">
      <CartaEditMedicamento @actualizar_tabla="obtenerMedicamentos" :id="id_medicamento" />
    </v-container>
  </v-dialog>
  <v-dialog v-model="this.dialogEliminar" width="auto">
    <v-card
      max-width="400"
      prepend-icon="mdi-delete-alert"
      title="Oprimiste eliminar"
      color="warning"
    >
      <template v-slot:text> ¿Seguro/a de querer eliminar {{ this.nombre_medicamento }}? </template>
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn class="ms-auto" text="Cancelar" @click="this.dialogEliminar = false"></v-btn>
        <v-btn class="ms-auto" text="Ok" @click="eliminarMedicamento"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
import sofiSaludService from '@/services/sofiSaludService'
import CartaAñadirMedicamento from '../Cards/cartaAñadirMedicamento.vue'
import CartaEditMedicamento from '../Cards/cartaEditMedicamento.vue'

export default {
  components: {
    CartaAñadirMedicamento,
    CartaEditMedicamento,
  },
  data: () => ({
    dialogEditar: false,
    dialogEliminar: false,
    id_medicamento: null,
    nombre_medicamento: null,
    agregarMedicamento: false,
    loadingConfig: true,
    search: '',
    medicamentos: [],
    pagina: 1,
    itemsPerPage: 10,
    totalItems: 0,
    isSearching: false,
    headers: [
      { title: 'Orden', value: 'id_medicamento' },
      { title: 'Nombre', value: 'nombre_medicamento' },
      { title: 'Descripción', value: 'descripcion_medicamento' },
      { title: 'Principio Activo', value: 'principo_activo_medicamento' },
      { title: 'Dosificación', value: 'dosificacion_medicamento' },
      { title: 'Laboratorio', value: 'laboratorio_medicamento' },
      { title: 'Presentación', value: 'presentacion' },
      { title: 'Sesion creadora', value: 'usuario' },
      { title: 'Actions', key: 'actions', align: 'end', sortable: false }, //columna para las acciones
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

    async buscar() {
      const busquedaMedicamento = { busqueda: this.search }
      try {
        this.loadingConfig = true
        const res = await sofiSaludService.buscarMedicamentos(busquedaMedicamento)
        this.medicamentos = res.data.datos
        this.isSearching = true
      } catch (error) {
        console.error(error)
      } finally {
        this.loadingConfig = false
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

    editar(id) {
      this.id_medicamento = id
      this.dialogEditar = true
    },

    eliminar(id, nombre) {
      this.id_medicamento = id
      this.nombre_medicamento = nombre
      this.dialogEliminar = true
      console.log(this.id_medicamento, this.nombre_medicamento)
    },

   async eliminarMedicamento(){
    try {
      const res = await sofiSaludService.deleteMedicamento(this.id_medicamento)
      console.log(res)
      this.dialogEliminar=false
      this.obtenerMedicamentos()
    } catch (error) {
      console.log(error)
    }
   }
  },

  watch: {
    search(nuevaBusqueda) {
      if (!nuevaBusqueda) {
        this.isSearching = false
        this.obtenerMedicamentos()
      }
    },
  },
  mounted() {
    this.obtenerMedicamentos()
  },
}
</script>
