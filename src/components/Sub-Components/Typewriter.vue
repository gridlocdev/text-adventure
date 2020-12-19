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
      @click="emitIncrementSequence()"
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
  data: function () {
    return {
      currentText: "",
      charIndex: 0,
      fullText: this.text,
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
      // Set the flag for typing, so other components can use this info.
      this.typing = true;
      // Type() takes the text passed into this.fullText, and

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
    },
    emitIncrementSequence() {
      this.$emit("incrementSequence");
    },
  },
  mounted() {
    this.TextSpeed = this.$store.state.TextSpeed;
    this.type();
  },
};
</script>

<style scoped>
.typedText > .text {
  border-right: 0.2rem solid #777;
}
</style>