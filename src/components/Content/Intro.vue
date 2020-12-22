<template>
  <v-container
    id="fadeContainer"
    class="animate__animated animate__fadeIn"
    style="--animate-duration: 3s"
  >
    <v-col>
      <v-row align="center" justify="center">
        <h1>{{ title }}</h1>
      </v-row>

      <v-row align="center" justify="center">
        {{ subText }}
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "Intro",
  props: {
    title: String,
    subText: String,
  },
  methods: {
    initFadeOut() {
      // Function to handle fading in/out Intro text on a timer.
      // Wait the 3000ms for fadeIn, then fadeOut.
      var fadeContainer = document.getElementById("fadeContainer");
      setTimeout(() => {
        // Checking if exists to avoid navigation error.
        if (document.body.contains(fadeContainer)) {
          fadeContainer.classList.replace(
            "animate__fadeIn",
            "animate__fadeOut"
          );
          // Wait for the 3000ms for fadeOut to end, and emit an event.
          setTimeout(() => {
            this.$store.dispatch(
              "setSequencerIndex",
              this.$store.state.SequencerIndex + 1
            );
            this.$emit("incrementSequence");
          }, 3000);
        }
      }, 3000);
    },
  },
  errorCaptured(error) {
    console.log("Error occured in Intro component: " + error);
  },
  activated() {
    this.$store.dispatch("setPageIndex", this.$options.name);
    this.initFadeOut();
  },
};
</script>

<style>
</style>