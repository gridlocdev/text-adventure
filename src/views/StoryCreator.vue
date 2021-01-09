<template>
  <v-container>
    
    <h1>Story Creator</h1>
      <v-row>
        <AddChapter
          v-for="chapter in numberOfChapters"
          :key="chapter"
          v-on:addChapter="addChapter"
          v-on:removeChapter="removeChapter"
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
      numberOfChapters: 1,
    };
  },
  methods: {
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