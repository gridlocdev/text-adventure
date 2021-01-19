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
  mounted() {
    console.log("State: StoryJSON: " + this.$store.state.CurrentStoryJSON);

    console.log("StoryJSON: " + typeof this.storyJSON);
    
    console.log("ChapterJSON: " + JSON.stringify(this.chapterJSON));
  },
  computed: {
    chapterJSON: function () {
      return this.storyJSON.Chapters[this.$store.state.CurrentChapter - 1]
        .ChapterSections;
    },
    ...mapState(["CurrentChapter"]),
  },
  watch: {
    CurrentChapter(newValue, oldValue) {
      if (
        newValue <= this.$store.state.NumberOfChapters &&
        this.$store.state.GameInProgress == true
      ) {
        //this.populateCurrentChapterJSON();
        this.$store.dispatch("setSequencerIndex", 0);
        this.$router.push("/chapter" + this.$store.state.CurrentChapter);
        // this.$store.dispatch("resetIntroFade");
        console.log(`Updating Current Chapter from ${oldValue} to ${newValue}`);
      } else {
        //this.populateCurrentChapterJSON();
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

    // populateCurrentChapterJSON() {
    //   console.log("Current Chapter" + this.$store.state.CurrentChapter);
    //   console.log(
    //     "Current Chapter JSON: " + JSON.stringify(this.storyJSON, null, 2)
    //   );
    //   this.chapterJSON = this.storyJSON.Chapters[
    //     this.$store.state.CurrentChapter - 1
    //   ].ChapterSections;
    //   //console.log("populateCurrentChapterJSON: " + JSON.stringify(this.chapterJSON));
    // },
  },
};
</script>

<style>
</style>