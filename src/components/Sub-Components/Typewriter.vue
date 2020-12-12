<template>
  <v-container>
    <v-card>
      <h1>
        <span class="typedText">
          <span class="text text-wrap"> {{ this.currentText }} </span>
        </span>
      </h1>
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
    };
  },
  methods: {
    delay: function (ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    type: async function () {
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
    },
  },
  mounted() {
    this.TextSpeed = this.$store.state.TextSpeed;
    this.type();
  },
};
</script>

<style>
.typedText > .text {
  border-right: 0.2rem solid #777;
}
</style>