<template>
  <v-container id="fadeOutContainer">
    
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
        </v-btn>
      </v-col>
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
    gameOverText: String,
  },
  methods: {
    answerChoice(answerChoice) {
      if (answerChoice == this.correctChoice) {
        this.fadeOutAndNavigate("./chapter1");
        this.$store.state.SequenceIndex++;
        this.$emit("incrementSequence");
        console.log("Success!");
      } else {
        // emit an event for the Sequencer to re-route to gameover
        this.$emit("GameOver", this.gameOverText);
        this.$store.state.GameOverText = this.gameOverText;
        this.fadeOutAndNavigate("./gameover");
        console.log(this.$store.state.GameOverText);
        console.log("FAILED. TRY AGAIN BOOMER.");
      }
    },
    fadeOutAndNavigate(routerLink) {
      setTimeout(() => {
        var fadeOutContainer = document.getElementById("fadeOutContainer");
        if (document.body.contains(fadeOutContainer)) {
          fadeOutContainer.setAttribute("style", "--animate-duration: 0.5s");
          fadeOutContainer.classList.add(
            "animate__animated",
            "animate__fadeOut"
          );
        }
      }, 200);
      setTimeout(() => {
        this.$router.push(routerLink);
      }, 1500);
    },
  },
};
</script>

<style>
</style>