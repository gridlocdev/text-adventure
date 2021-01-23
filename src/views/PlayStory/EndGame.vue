<template>
  <v-container>
    <v-row>
      <v-col
        id="fadeContainer"
        class="animate__animated animate__fadeIn"
        align="center"
        justify="center"
        :key="textIndex"
      >
        <v-row>
          <v-col>
            <h1>
              {{ EndingTextArray[textIndex].text }}
            </h1>
          </v-col>
        </v-row>
        <v-row
          v-if="textIndex == this.EndingTextArray.length - 1"
          class="ma-5"
          align="center"
          justify="center"
        >
          <v-btn
            @click="resetAndNavigateToHome()"
            elevation="2"
            large
            color="primary"
            class=""
          >
            Return to Home
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Component Description:
// This is a page component at the end of a story's chapters.
// This displays a Thanks for Playing message, and allows the user to navigate back home.

export default {
  name: "EndGame",
  data() {
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
    resetAndNavigateToHome() {
      // Resets story progress, and hits the home route with a clean state.
      console.log("resetAndNavigateToHome() Hit.");
      this.$store.dispatch("resetStoryProgress");

      this.dialog = false;

      this.$emit("closeSettingsModal");
      this.$router.push({ name: "Start" });
      this.$router.go();
    },
  },
  mounted() {
    this.textIndex = 0;
    this.$store.dispatch("setGameInProgress", false);
    // On load, show the first textIndex entry and just leave the next to render
    setTimeout(() => {
      var fadeContainer = document.getElementById("fadeContainer");
      // Checking if exists to avoid navigation error.
      if (document.body.contains(fadeContainer)) {
        fadeContainer.classList.replace("animate__fadeIn", "animate__fadeOut");
        // Wait for the 3000ms for fadeOut to end, and emit an event.
        setTimeout(() => {
          this.$store.dispatch("setSequencerIndex", 0);
          this.$store.dispatch("setCurrentChapter", 1);
          this.$store.dispatch("resetIntroFade");
          this.textIndex++;
        }, 1500);
      }
    }, 2000);
  },
};
</script>

<style>
</style>