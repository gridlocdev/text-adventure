<template>
  <v-container>
    <v-row>
      <typewriter
        :key="text[textIndex]"
        v-bind:text="text[textIndex]"
        v-on:finished-typing="makeVisible()"
        @nextTextChunk="nextTextChunk()"
      />
    </v-row>
    <v-row
      align="center"
      justify="center"
      :style="{
        'pointer-events': 'none',
        position: 'absolute',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
      }"
      class="my-5"
    >
      <div v-for="number in numberOfTextChunks" :key="number">
        <v-col v-if="number <= textIndex + 1">
          <v-btn
            class="animate__animated animate__fadeIn"
            style="animation-duration: 0.5s"
            fab
            color="primary"
            height="15"
            width="15"
          ></v-btn>
        </v-col>
        <v-col v-else>
          <v-btn fab height="15" width="15"></v-btn>
        </v-col>
      </div>
    </v-row>
  </v-container>
</template>

<script>
// Component Description:
// This is a Section component inside the story's chapters.
// This handles displaying a set of text chunks, and displays them one by one.

import Typewriter from "../../Typewriter.vue";
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
  computed: {
    numberOfTextChunks: function () {
      return this.text.length;
    },
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