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
      storyJSON: this.$store.state.CurrentStoryJSON
    };
  },
};
</script>

<style>
</style>