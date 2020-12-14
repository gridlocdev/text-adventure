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
  </v-container>
</template>

<script>
export default {
  name: "Typewriter",
  props: {
    text: String,
  },
  data: function () {
    return {
      currentText: "",
      charIndex: 0,
      fullText: this.text,
      TextSpeed: 0,
      typing: Boolean,
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
      this.$emit('finished-typing');
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