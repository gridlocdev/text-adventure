<template>
  <v-container>
    <v-row>
      <v-col align="center" justify="center">
        <h1
          id="fadeContainer"
          class="animate__animated animate__fadeIn"
          :key="textIndex"
        >
          {{ EndingTextArray[textIndex].text }}
        </h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "EndGame",
  data: function () {
    return {
      textIndex: 0,
      EndingTextArray: [
        {
          text: "Game Complete!",
        },
        {
          text: "Thanks for Playing!",
        },
      ],
    };
  },
  methods: {
  },
  mounted() {
    // On load, show the first textIndex entry and just leave the next to render
    setTimeout(() => {
      var fadeContainer = document.getElementById("fadeContainer");
      // Checking if exists to avoid navigation error.
      if (document.body.contains(fadeContainer)) {
        fadeContainer.classList.replace("animate__fadeIn", "animate__fadeOut");
        // Wait for the 3000ms for fadeOut to end, and emit an event.
        setTimeout(() => {
          this.$emit("endGame");
          this.textIndex++;
        }, 1500);
      }
    }, 2000);
  },
};
</script>

<style>
</style>