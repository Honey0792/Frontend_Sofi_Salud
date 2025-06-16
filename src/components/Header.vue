<template>
  <v-toolbar border color="#E95820" class="px-4">
    <v-toolbar-title class="text-uppercase text-white">
      <span class="font-weight-bold">Sofi Salud </span>
      <span class="font-weight-light"></span>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    cerrarSession() {
      sessionStorage.clear();
    },
  },
  mounted() {
    this.cerrarSession();
  },
};
</script>
