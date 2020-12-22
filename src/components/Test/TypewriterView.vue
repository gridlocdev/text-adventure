<template>
  <v-container>
    <typewriter
      :key="text[textIndex]"
      v-bind:text="text[textIndex]"
      v-on:finished-typing="makeVisible()"
      @nextTextChunk="nextTextChunk()"
    />
  </v-container>
</template>

<script>
import Typewriter from "../Sub-Components/Typewriter";
export default {
  components: {
    Typewriter,
  },
  props: {
    text: Array,
  },
  data: function () {
    return {
      textIndex: 0,
      nextButtonVisible: false,
    };
  },
  methods: {
    nextTextChunk() {
      // Advances to the next text chunk in the list of text to display.
      if (this.textIndex < this.text.length - 1) {
        this.textIndex++;
      } else {
        this.$store.dispatch(
          "setSequencerIndex",
          this.$store.state.SequencerIndex + 1
        );
        this.$emit("incrementSequence");
        this.textIndex = 0;
      }
    },
    makeVisible() {
      this.visible = true;
    },
  },
};
</script>

<style>
</style>