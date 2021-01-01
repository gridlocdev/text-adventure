<template>
  <v-container>
    <v-row
      class="animate__animated animate__zoomIn"
      align="center"
      justify="center"
    >
      <h1 class="error--text" style="font-size: 2.5em; letter-spacing: 0.2em">
        GAME OVER
      </h1>
    </v-row>
    <v-row class="ma-10" align="center" justify="center">
      <typewriter :key="this.text" :text="this.text" :showNextButton="false" />
    </v-row>
    <v-row class="ma-10 mt-13">
      <v-col
        align="center"
        justify="center"
        class="animate__animated animate__zoomIn"
      >
        <v-btn color="primary" elevation="2" x-large @click="clickTryAgain()">
          Try Again
        </v-btn></v-col
      >
      <v-col
        align="center"
        justify="center"
        class="animate__animated animate__zoomIn"
      >
        <v-btn
          color="error"
          elevation="2"
          x-large
          @click="clickRestartChapter()"
        >
          Restart Chapter
        </v-btn></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
import Typewriter from "../../components/Content/Typewriter.vue";

export default {
  components: {
    Typewriter,
  },
  data: function () {
    return {
      text: String,
    };
  },
  methods: {
    updateGameOverText() {
      this.text = this.$store.state.GameOverText;
    },
    clickTryAgain() {
      this.$router.go(-1);
    },
    clickRestartChapter() {
      this.$store.dispatch("resetIntroFade");
      this.$store.dispatch("resetChapter");
      console.log("clickRestartChapter clicked.");

      this.$router.push("./");
    },
  },
  activated() {
    this.updateGameOverText();
  },
  created: function () {
    this.updateGameOverText();
  },
  watch: {
    text: function () {
      // When the SettingsModal is opened, call SetPageIndex()
      this.updateGameOverText();
    },
  },
};
</script>

<style scoped>
.animate__animated {
  animation-duration: 0.5s;
}
</style>