<template>
  <v-container
    class="Start animate__animated animate__fadeIn"
    style="animation-duration: 0.5s"
  >
    <v-col>
      <v-row class="pa-md-2" align="center" justify="center">
        <h1>Text Adventure Game</h1>
      </v-row>
      <v-row class="pb-md-5 ma-2" align="center" justify="center">
        <h3>Test your might against the greatest of text adventures.</h3>
      </v-row>
      <v-row class="pa-md-5 ma-8" align="center" justify="center">
        <v-btn
          @click="$router.push('./chapterSequencer')"
          elevation="2"
          x-large
          color="primary"
          class="animate__animated animate__pulse animate__infinite"
        >
          Start
        </v-btn>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "Start",
  mounted() {
    this.$store.dispatch("setPageIndex", this.$options.name);
  },
};
</script>