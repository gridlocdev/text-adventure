<template>
  <v-container>
    <v-row class="animate__animated animate__zoomIn" align="center" justify="center">
      <h1 style="letter-spacing: 0.2em;">GAME OVER</h1>
      
    </v-row>
    <v-row class="ma-10" align="center" justify="center">
      <typewriter v-bind:text="this.text" />
    </v-row>
    <v-row class="ma-10">
      <v-col
        align="center"
        justify="center"
        class="ms-10 animate__animated animate__zoomIn"
      >
        <v-btn color="primary" elevation="2" x-large> Return </v-btn></v-col
      >
      <v-col
        align="center"
        justify="center"
        class="ms-10 animate__animated animate__zoomIn"
      >
        <v-btn color="error" elevation="2" x-large> End Game </v-btn></v-col
      >
    </v-row>

    
  </v-container>
</template>

<script>
import Typewriter from "./Typewriter.vue";
export default {
  components: {
    Typewriter,
  },
  props: {
    text: String,
  },
};
</script>

<style scoped>

.animate__animated {
  animation-duration: 0.5s;
}

</style>