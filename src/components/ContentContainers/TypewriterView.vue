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
// Component Description:
// This is a Section component inside the story's chapters.
// This handles displaying a set of text chunks, and displays them one by one.

import Typewriter from "../Content/Typewriter";
export default {
  components: {
    Typewriter,
  },
  props: {
    text: Array,
  },
  data() {
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