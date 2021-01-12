<template>
  <v-container>
    <h1>Story Creator</h1>
    <v-row>
      <AddChapter
        v-for="chapterNumber in numberOfChapters"
        :key="chapterNumber"
        :chapterNumber="chapterNumber"
        v-on:addChapter="addChapter"
        v-on:removeChapter="removeChapter"
        @updateChapterData="updateChapterData"
      ></AddChapter>
    </v-row>
  </v-container>
</template>

<script>
//import chapterSectionDraggables from "../components/Draggables/ChapterSectionDraggables.vue";
import AddChapter from "../components/StoryCreator/AddChapter.vue";

export default {
  components: {
    AddChapter,
    //  chapterSectionDraggables,
  },
  data() {
    return {
      storyJSON: {
        Chapters: [{}],
      },
      currentChapterID: 0,
      currentChapterData: {},
      numberOfChapters: 1,
    };
  },
  methods: {
    updateChapterData(value) {
      console.log("updateChapterData: " + JSON.stringify(value));
      this.currentChapterData = value;
    },
    addChapter() {
      // Modify the storyJSON, add this chapter in the index it was created in.
      this.numberOfChapters++;
      console.log("AddChapter() hit.");
    },
    removeChapter() {
      console.log("RemoveChapter() hit.");
    },
  },
};
</script>

<style scoped>
</style>