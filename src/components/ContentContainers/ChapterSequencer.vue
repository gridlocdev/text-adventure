<template>
  <sequencer
    :key="JSON.stringify(chapterJSON)"
    :jsonPayload="JSON.stringify(chapterJSON)"
    v-on:endGame="endGame()"
  />
</template>

<script>
// Component Description:
// This component handles showing story data for a specific chapter.

import Sequencer from "./Sequencer.vue";

import { mapState } from "vuex";

export default {
  name: "ChapterSequencer",
  components: {
    Sequencer,
  },
  data() {
    return {
      storyJSON: JSON.parse(this.$store.state.CurrentStoryJSON),
    };
  },
  computed: {
    chapterJSON: function () {
      // Computed property to select the current chapter's JSON from the full story JSON
      if (this.$store.state.CurrentChapter != -1) {
        return this.storyJSON.Chapters[this.$store.state.CurrentChapter - 1]
          .ChapterSections;
      } else {
        return {};
      }
    },
    ...mapState(["CurrentChapter"]),
  },
  watch: {
    CurrentChapter(newValue) {
      // When the chapter changes, update the app state
      // Also, handles when the chapter advances to where the game should end.
      if (
        newValue <= this.$store.state.NumberOfChapters &&
        newValue >= 0 &&
        this.$store.state.GameInProgress == true
      ) {
        this.$store.dispatch("setSequencerIndex", 0);
        this.$router.push("/chapter" + this.$store.state.CurrentChapter);
      } else {
        this.$store.dispatch("setCurrentChapter", -1);
        this.endGame();
      }
    },
  },
  methods: {
    endGame() {
      this.$store.dispatch("setGameInProgress", false);
      this.$router.push("/endgame");
    },
  },
  mounted() {
    this.$store.dispatch("setNumberOfChapters", this.storyJSON.Chapters.length);
    // If a game was just ended, reset the state's progress values.
    if (
      this.$store.state.GameInProgress == false &&
      this.$store.state.CurrentChapter == -1
    ) {
      this.$store.dispatch("setCurrentChapter", 1);
      this.$store.dispatch("setSequencerIndex", 0);
    }
  },
};
</script>

<style>
</style>