<template>
  <Sequencer
    :key="JSON.stringify(chapterJSON)"
    :jsonPayload="JSON.stringify(chapterJSON)"
  />
</template>

<script>
import Sequencer from "./Sequencer.vue";

import { mapState } from "vuex";

export default {
  name: "ChapterSequencer",
  components: {
    Sequencer,
  },
  created() {
    console.log("Chapter: " + this.$store.state.CurrentChapter);
    this.populateCurrentChapterJSON();
    console.log("ChapterJSON: " + JSON.stringify(this.chapterJSON));
  },
  computed: mapState(["CurrentChapter"]),
  watch: {
    CurrentChapter(newValue, oldValue) {
      if (newValue <= this.$store.state.NumberOfChapters) {
        this.populateCurrentChapterJSON();
        this.$store.dispatch("setSequencerIndex", 0);
        // this.$store.dispatch("resetIntroFade");
        console.log(`Updating Current Chapter from ${oldValue} to ${newValue}`);
      } else {
        console.log("Hit end of game! Congratulations!");
      }
    },
  },
  methods: {
    populateCurrentChapterJSON() {
      this.chapterJSON = this.chapterJSON = this.storyJSON[
        "Chapter" + this.$store.state.CurrentChapter
      ].ChapterJSON;
    },
  },
  data() {
    return {
      chapterJSON: {
        // Just the chapter's json
      },
      storyJSON: {
        Chapter1: {
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
                  text: "What should you dooooo?",
                  choices: {
                    choice1: "COption 1",
                    choice2: "COption 2",
                  },
                  choicesMetadata: {
                    correctChoice: "1",
                    gameOverText: "GAMEOVER: 2",
                    successText: "SUCCESS: 2",
                  },
                },
                Ending: {
                  title: "Chapter 1 Complete!",
                  subText: "You've successfully started your journey!",
                },
              },
            ],
          },
        },
        Chapter2: {
          ChapterJSON: {
            MainSections: [
              {
                Intro: {
                  title: "Chapter 2",
                  subText: "The Other Guy",
                },
                TextSection1: [
                  {
                    text: "A guy's there.",
                  },
                  {
                    text: "This other guy is pretty cool.",
                  },
                  {
                    text: "What's his name again? Who knows.",
                  },
                ],
                ChoiceSection1: {
                  text: "Should you ask his name?",
                  choices: {
                    choice1: "Heck yeah",
                    choice2: "Nah, im good",
                  },
                  choicesMetadata: {
                    correctChoice: "1",
                    gameOverText: "He roundhouse kicks u into the atmosphere.",
                    successText:
                      "My name is... Chuck norris. Here's 10 million dollars.",
                  },
                },
                TextSection2: [
                  {
                    text:
                      "Now equipped with 10 million dollars, you set your sights on the moon.",
                  },
                  {
                    text:
                      "You call NASA, but they aren't too interested in your offer.",
                  },
                  {
                    text:
                      "10 million is a lot, but you might not be able to go to the moon with that.",
                  },
                ],
                ChoiceSection2: {
                  text: "You need more money, what should you do?",
                  choices: {
                    choice1: "Become a hotdog stand guy",
                    choice2: "Go begging in old school runescape",
                  },
                  choicesMetadata: {
                    correctChoice: "2",
                    gameOverText:
                      "You end up liking hot dogs so much that u explode",
                    successText:
                      "You find a runescape player that's sick nasty and gives you 400 billion GP",
                  },
                },
                Ending: {
                  title: "Chapter 2 Complete!",
                  subText: "You're rich! Muahahahahaaaaa",
                },
              },
            ],
          },
        },
      },
    };
  },
};
</script>

<style>
</style>