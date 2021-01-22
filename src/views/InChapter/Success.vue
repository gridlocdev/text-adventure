<template>
  <v-container>
    <v-row
      class="animate__animated animate__fadeInDown"
      align="center"
      justify="center"
    >
      <h1
        class="success--text"
        style="font-size: 2.5em; letter-spacing: 0.15em"
      >
        Success!
      </h1>
    </v-row>
    <v-row class="ma-10" align="center" justify="center">
      <typewriter :key="this.text" :text="this.text" :showNextButton="false" />
    </v-row>
    <v-row class="ma-10">
      <v-col
        align="center"
        justify="center"
        class="animate__animated animate__zoomIn"
      >
        <v-btn
          x-large
          style="animation-duration: 1s"
          class="animate__animated animate__infinite animate__pulse"
          color="success"
          elevation="2"
          @click="clickContinue()"
        >
          Continue
        </v-btn></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
// Component Description:
// This is a page component inside the story's chapters.
// When the user selects the right answer, this page appears as a success message.

import Typewriter from "../../components/Content/Typewriter.vue";
import store from "../../store/index.js";

export default {
  components: {
    Typewriter,
  },
  data() {
    return {
      text: String,
      store: store,
    };
  },
  watch: {
    text: function () {
      this.updateSuccessText();
    },
  },
  methods: {
    clickContinue() {
      this.$emit("incrementSequence");
      this.$store.dispatch(
        "setSequencerIndex",
        this.$store.state.SequencerIndex + 1
      );
      this.$router.push("chapter" + store.state.CurrentChapter);
    },
    updateSuccessText() {
      this.text = this.$store.state.SuccessText;
    },
  },
  activated() {
    this.updateSuccessText();
  },
  created() {
    this.updateSuccessText();
  },
};
</script>

<style scoped>
.animate__animated {
  animation-duration: 0.5s;
}
</style>