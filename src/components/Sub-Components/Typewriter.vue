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
    text: String      
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
    type: function () {
      // Type() takes the text passed into this.fullText, and 
      // console.log(this.$store.state.TextSpeed);
      setInterval(() => {
        this.currentText += this.fullText.charAt(this.charIndex);
        this.charIndex++;
      }, this.TextSpeed);
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