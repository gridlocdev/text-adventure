<template>
  <v-container
    id="fadeContainer"
    class="animate__animated animate__fadeIn"
    style="--animate-duration: 3s"
  >
    <v-col>
      <v-row align="center" justify="center">
        <h1>{{ Header }}</h1>
      </v-row>

      <v-row align="center" justify="center">
        {{ SubText }}
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "Intro",
  props: {
    Header: String,
    SubText: String,
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
            this.$emit("incrementSequence");
          }, 3000);
        }
      }, 3000);
    },
  },
  errorCaptured(error) {
    console.log(
      "haha. I've caught the error, but done nothing about it.",
      error
    );
  },
  mounted() {
    this.$store.dispatch("setPageIndex", this.$options.name);
    this.initFadeOut();
  },
};
</script>

<style>
</style>