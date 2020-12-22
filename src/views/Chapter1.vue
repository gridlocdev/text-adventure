<template>
  <Sequencer :jsonPayload="JSON.stringify(ChapterJSON)" />
</template>

<script>
import Sequencer from "../components/Test/Sequencer.vue";
export default {
  name: "Chapter1",
  components: { Sequencer },
  data() {
    return {
      ChapterJSON: {
        MainSections: [
          {
            Intro: {
              title: "Chapter 1",
              subText: "The Unruly King",
            },
            TextSection1: [
              {
                text: "You wake up.",
              },
              {
                text: "The servant takes you to the castle.",
              },
              {
                text: "King says hi, but you need sword.",
              },
            ],
            ChoiceSection1: {
              text: "What should you do?",
              choices: {
                choice1: "Option 1",
                choice2: "Option 2",
              },
              choicesMetadata: {
                correctChoice: "1",
                gameOverText: "You cut his hand. GAMEOVER",
                successText: "He hands you the sword, good job!",
              },
            },
            TextSection2: [
              {
                text: "EEEEEEEEEEEEEEI am text one.",
              },
              {
                text: "I am text two.",
              },
              {
                text: "Huzzah!",
              },
            ],
            ChoiceSection2: {
              text: "What should you do?",
              choices: {
                choice1: "Option 1",
                choice2: "Option 2",
              },
              choicesMetadata: {
                correctChoice: "1",
                gameOverText: "You cut his hand. GAMEOVER",
                successText: "He hands you the sword, good job!",
              },
            },
            Ending: {
              title: "Chapter 1 Complete!",
              subText: "You've successfully started your journey!",
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.$store.dispatch("setPageIndex", this.$options.name);
  },
};
</script>

<style>
</style>