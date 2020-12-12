<template>
  <v-container>
    <v-row class="ma-10" align="center" justify="center">
      <v-card class="pa-10" elevation="5">
        <h1 class="animate__animated animate__fadeIn">
          <span> {{ text }}</span>
        </h1>
      </v-card>
    </v-row>
    <v-row class="ma-10" align="center" justify="center">
      <v-col class="ms-10 animate__animated animate__flipInX">
        <v-btn
          elevation="2"
          x-large
          color="dark"
          class="animate__animated animate__pulse animate__infinite"
        >
          {{ choice1 }}
        </v-btn></v-col
      >
      <v-col class="ms-10 animate__animated animate__flipInX">
        <v-btn
          elevation="2"
          x-large
          color="dark"
          class="animate__animated animate__pulse animate__infinite"
        >
          {{ choice2 }}
        </v-btn></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    text: String,
    choice1: String,
    choice2: String,
  },
};
</script>

<style>
</style>