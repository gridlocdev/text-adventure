<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn
          v-if="!chapterActivated"
          @click="activateChapter()"
          class="pa-2"
          elevation="5"
          block
          ><v-icon>mdi-plus</v-icon>
          <span class="ms-2"><strong> Add Chapter</strong></span></v-btn
        >
        <v-sheet
          v-if="chapterActivated"
          class="chapterSheet pa-2"
          elevation="10"
          outlined
          rounded
        >
          <v-row class="mx-2 d-flex">
            <v-icon dense class="ma-2"> mdi-folder-plus </v-icon>
            <h2 class="my-4">Chapter 1</h2>
            <v-icon class="ml-auto">mdi-close</v-icon>
          </v-row>

          <add-intro-section></add-intro-section>
          <add-text-section></add-text-section>
          <add-choice-section></add-choice-section>
          <add-ending-section></add-ending-section>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddIntroSection from "./AddIntroSection.vue";
import AddTextSection from "./AddTextSection.vue";
import AddEndingSection from "./AddEndingSection.vue";
import AddChoiceSection from "./AddChoiceSection.vue";
export default {
  name: "AddChapter",
  components: {
    AddIntroSection,
    AddChoiceSection,
    AddTextSection,
    AddEndingSection,
  },
  methods: {
    activateChapter() {
      console.log("ActivateChapter() hit.");
      this.$emit("addChapter");
      this.chapterActivated = true;
    },
    reorderChapterItems() {
      console.log("I've been hit.");
    },
  },
  data() {
    return {
      chapterTimeline: [],
      chapterActivated: false,
      chapterName: "",
      chapterData: [],
    };
  },
  mounted() {
    this.chapterActivated = true;
  },
};
</script>

<style scoped>
</style>