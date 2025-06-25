<template>
  <v-card width="1000" max-height="600" class="pa-4" style="overflow-y: auto">
    <template v-if="loading">
      <v-skeleton-loader type="card" height="300" />
    </template>

    <template v-else-if="recomendacion?.comparacion?.medicamentosEnDB">
      <h2 class="text-h6 mb-4">Recomendaciones</h2>
      <v-list two-line>
        <v-list-group
          v-for="(med, index) in recomendacion.comparacion.medicamentosEnDB"
          :key="index"
          v-model="openGroups[index]"
          no-action
        >
          <template #activator="{ props }">
            <v-list-item v-bind="props" title="Medicamento Recomendado">
              <v-list-item-title>{{ med.nombre }} - {{ med.dosificacion }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ med.coincidenciasDB.length }} coincidencias encontradas
              </v-list-item-subtitle>
            </v-list-item>
          </template>

          <v-list-item v-for="item in med.coincidenciasDB" :key="item.id" class="px-6">
            <v-list-item-content>
              <v-list-item-title>{{ item.nombre }} ({{ item.dosificacion }})</v-list-item-title>
              <v-list-item-subtitle>
                <strong>Laboratorio:</strong> {{ item.laboratorio }} |
                <strong>Presentación:</strong> {{ item.presentacion }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </template>

    <template v-else>
      <p>No se encontraron coincidencias.</p>
    </template>
  </v-card>
</template>

<script>
import sofiSaludService from '@/services/sofiSaludService'

export default {
  props: {
    prompt: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    recomendacion: null,
    loading: true,
    openGroups: [],
  }),
  methods: {
    async mostrarRecomendacion() {
      try {
        const res = await sofiSaludService.consulta(this.prompt)
        this.recomendacion = res.data // Asegúrate de guardar el `data` que tiene .comparacion
        this.openGroups = this.recomendacion.comparacion.medicamentosEnDB.map(() => false)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
  },
  mounted() {
    this.mostrarRecomendacion()
  },
}
</script>
