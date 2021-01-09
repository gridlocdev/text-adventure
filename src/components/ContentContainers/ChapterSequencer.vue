<template>
  <Sequencer
    :key="JSON.stringify(chapterJSON)"
    :jsonPayload="JSON.stringify(chapterJSON)"
    v-on:endGame="endGame()"
  />
</template>

<script>
//v-on:reloadChapterData="reloadChapterData()"
import Sequencer from "./Sequencer.vue";

import { mapState } from "vuex";

export default {
  name: "ChapterSequencer",
  components: {
    Sequencer,
  },
  created() {
    this.populateCurrentChapterJSON();
  },
  computed: mapState(["CurrentChapter"]),
  watch: {
    CurrentChapter(newValue, oldValue) {
      if (
        newValue <= this.$store.state.NumberOfChapters &&
        this.$store.state.GameInProgress == true
      ) {
        this.populateCurrentChapterJSON();
        this.$store.dispatch("setSequencerIndex", 0);
        this.$router.push("/chapter" + this.$store.state.CurrentChapter);
        // this.$store.dispatch("resetIntroFade");
        console.log(`Updating Current Chapter from ${oldValue} to ${newValue}`);
      } else {
        this.populateCurrentChapterJSON();
        console.log("Game In Progress: " + this.$store.state.GameInProgress);
        console.log("CurrentChapter: " + this.$store.state.CurrentChapter);
      }
    },
  },
  methods: {
    endGame() {
      this.$store.dispatch("setGameInProgress", false);
      this.$router.push("/endgame");
      console.log("Hit end of game! Congratulations!");
    },
    populateCurrentChapterJSON() {
      this.chapterJSON = this.storyJSON.Chapters[
        this.$store.state.CurrentChapter - 1
      ].ChapterSections;
      //console.log("populateCurrentChapterJSON: " + JSON.stringify(this.chapterJSON));
    },
  },
  data: function () {
    return {
      chapterJSON: {
        // Just the chapter's json
      },
      storyJSON: {
        Chapters: [
          {
            ChapterName: "Chapter 1",
            ChapterSections: [
              {
                SectionType: "Intro",
                SectionData: {
                  title: "Chapter 1",
                  subText: "The Unruly King",
                },
              },
              {
                SectionType: "TextSection",
                SectionData: [
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
              },
              {
                SectionType: "ChoiceSection",
                SectionData: {
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
              },
              {
                SectionType: "TextSection",
                SectionData: [
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
              },
              {
                SectionType: "ChoiceSection",
                SectionData: {
                  text: "What should you do?",
                  choices: {
                    choice1: "Option 1",
                    choice2: "Option 2",
                  },
                  choicesMetadata: {
                    correctChoice: "1",
                    gameOverText: "GAMEOVER: 2",
                    successText: "SUCCESS: 2",
                  },
                },
              },
              {
                SectionType: "Ending",
                SectionData: {
                  title: "Chapter 1 Complete!",
                  subText: "You've successfully started your journey!",
                },
              },
            ],
          },
          {
            ChapterName: "Chapter 2",
            ChapterSections: [
              {
                SectionType: "Intro",
                SectionData: {
                  title: "Chapter 2",
                  subText: "The Other Guy",
                },
              },
              {
                SectionType: "TextSection",
                SectionData: [
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
              },
              {
                SectionType: "ChoiceSection",
                SectionData: {
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
              },
              {
                SectionType: "TextSection",
                SectionData: [
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
              },
              {
                SectionType: "ChoiceSection",
                SectionData: {
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
              },
              {
                SectionType: "Ending",
                SectionData: {
                  title: "Chapter 2 Complete!",
                  subText: "You're rich! Muahahahahaaaaa",
                },
              },
            ],
          },
        ],
      },
    };
  },
};
</script>

<style>
</style>