<template>
    <v-app class="kbg">
        <TablaMedicamnetos/>

    </v-app>
</template>

<script>
import TablaMedicamnetos from '@/components/Tables/tablaMedicamnetos.vue';

export default{
    components:{
        TablaMedicamnetos
    }
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