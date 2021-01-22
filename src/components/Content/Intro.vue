<template>
  <v-container
    id="fadeContainer"
    class="animate__animated animate__fadeIn"
    style="--animate-duration: 3s"
  >
    <v-col>
      <v-row class="ma-1" align="center" justify="center">
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
  data() {
    return {
      componentMountedTriggered: false,
      componentActivatedTriggered: false,
      fadeOutCalls: 0,
    };
  },
  methods: {
    initFadeOut() {
      // If the fadeOut hasn't been called yet

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
            this.$store.dispatch(
              "setSequencerIndex",
              this.$store.state.SequencerIndex + 1
            );
          }, 3000);
        }
      }, 3000);
    },
  },
  mounted() {
    if (!this.$store.state.ResetIntroFade) {
      this.initFadeOut();
    }
  },
  activated() {
    this.$store.dispatch("setPageIndex", this.$options.name);
    if (this.$store.state.ResetIntroFade) {
      this.$store.state.ResetIntroFade = false;
      this.initFadeOut();
    }
  },
};
</script>

<style>
</style>