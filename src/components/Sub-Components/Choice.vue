<template>
  <v-container>
    <v-row class="ma-10" align="center" justify="center">
      <v-card class="pa-10" elevation="5">
        <h1 class="animate__animated animate__fadeIn">
          <span> {{ text }}</span>
        </h1>
      </v-card>
    </v-row>
    <v-row class="ma-10">
      <v-col
        align="center"
        justify="center"
        class="ms-10 animate__animated animate__flipInX"
      >
        <v-btn
          @click="answerChoice(1)"
          elevation="2"
          x-large
          class="animate__animated animate__pulse animate__infinite"
        >
          {{ choice1 }}
        </v-btn></v-col
      >
      <v-col
        align="center"
        justify="center"
        class="ms-10 animate__animated animate__flipInX"
      >
        <v-btn
          @click="answerChoice(2)"
          elevation="2"
          x-large
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
    correctChoice: String,
  },
  methods: {
    answerChoice(answerChoice) {
      if (answerChoice == this.correctChoice) {
        console.log("Success!");
        
      } else {
        console.log("FAILED. TRY AGAIN BOOMER.");
      }
    },
  },
};
</script>

<style>
</style>