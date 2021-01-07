<template>
  <v-container>
    <v-row>
      <v-col>
        <testJSON></testJSON>
        <!-- <chapter-section-draggables> </chapter-section-draggables> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import chapterSectionDraggables from "../components/Draggables/ChapterSectionDraggables.vue";
import testJSON from '../components/Test/testJSON.vue'

export default {
  components: {
    // chapterSectionDraggables,
testJSON
  },
};
</script>

<style scoped>
</style>