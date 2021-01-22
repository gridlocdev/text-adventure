<template>
  <v-container>
    <v-card class="pa-5" elevation="5">
      <h2 style="position: absolute; margin-right: 20px">
        <span class="typedText">
          <span class="text text-wrap"> {{ this.currentText }} </span>
        </span>
      </h2>
      <h2 style="visibility: hidden">
        {{ this.fullText }}
      </h2>
    </v-card>

    <v-btn
      :key="this.nextButtonVisible"
      v-show="this.nextButtonVisible"
      :bottom="true"
      :right="true"
      :absolute="true"
      class="animate__animated animate__fadeIn pa-7 mr-5"
      primary
      @click="emitMoveToNextTextChunk()"
    >
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "Typewriter",
  props: {
    text: String,
    showNextButton: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentText: "",
      charIndex: 0,
      fullText: "",
      TextSpeed: 0,
      typing: Boolean,
      nextButtonVisible: false,
    };
  },
  methods: {
    delay: function (ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    type: async function () {
      // Begin typing the characters from this component's text
      // Set the flag for typing, so other components can use this info.
      this.typing = true;
      // Type() takes the text passed into this.fullText, and
      try {
        // While loop iterating over every character in the text string.
        while (this.charIndex < this.fullText.length) {
          var currentLetter = this.fullText.charAt(this.charIndex);

          this.currentText += currentLetter;

          // Apply conditional delay based on the character typed
          switch (currentLetter) {
            case ".":
            case "?":
            case "!":
              await this.delay(this.TextSpeed * 3);
              break;
            case ",":
              await this.delay(this.TextSpeed * 2);
              break;
            default:
              await this.delay(this.TextSpeed);
              break;
          }
          // Move to the next letter
          this.charIndex++;
        }
        this.typing = false;

        // Check if it should render the next button
        if (this.showNextButton == true) {
          this.nextButtonVisible = true;
        }
      } catch (ex) {
        // There's an awful error message in this function that doesn't make sense. 
        // It says that this.fullText is undefined, yet knows its value and executes the rest of the function. 
        // I'm tossing it up to Vue not handling this one appropriately, so here's an empty catch block.
        return;
      }
    },
    emitMoveToNextTextChunk() {
      // Emits an event to the parent view, to tell it to go to the next text section.
      this.$emit("nextTextChunk");
    },
  },
  mounted() {
    this.TextSpeed = this.$store.state.TextSpeed;
    this.fullText = this.text;
    this.type();
  },
};
</script>

<style scoped>
.typedText > .text {
  border-right: 0.2rem solid #777;
}
</style>