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
      if (this.textIndex < this.text.length - 1) {
        this.textIndex++;
        //console.log(this.textIndex);
      } else {
        console.log("Completed Text Sequence!");
        this.$store.state.SequenceIndex++;
        this.$emit("incrementSequence");
        this.textIndex = 0;
        //console.log(this.textIndex);
      }
    },
    makeVisible() {
      this.visible = true;
    },
  },
  // mounted() {
  //   this.$refs.typewriter.$on("finished-typing");
  // },
};
</script>

<style>
</style>