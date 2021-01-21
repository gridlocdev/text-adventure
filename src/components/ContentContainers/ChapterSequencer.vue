<template>
  <sequencer
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
  data: function () {
    return {
      // chapterJSON: this.storyJSON.Chapters[this.$store.state.CurrentChapter - 1]
      //   .ChapterSections,
      // Just the chapter's json
      storyJSON: JSON.parse(this.$store.state.CurrentStoryJSON),
    };
  },
  computed: {
    chapterJSON: function () {
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
    CurrentChapter(newValue, oldValue) {
      if (
        newValue <= this.$store.state.NumberOfChapters &&
        this.$store.state.GameInProgress == true
      ) {
        this.$store.dispatch("setSequencerIndex", 0);
        this.$router.push("/chapter" + this.$store.state.CurrentChapter);
        console.log(`Updating Current Chapter from ${oldValue} to ${newValue}`);
      } else {
        this.$store.dispatch("setCurrentChapter", -1);
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
  },
  created() {
    this.$store.dispatch("setNumberOfChapters", this.storyJSON.Chapters.length);
  },
};
</script>

<style>
</style>