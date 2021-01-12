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
            <h2 class="my-4">{{ chapterName }}</h2>
            <v-icon @click="removeChapter()" class="ml-auto clickable"
              >mdi-close</v-icon
            >
          </v-row>

          <div v-for="section in chapterTimeline" :key="section.id">
            <!-- {{ JSON.stringify(section) }} -->
            <component
              :is="section.SectionComponent"
              :sectionID="section.id"
              @sectionModified="updateCurrentSectionID"
              @updateComponentData="updateComponentData"
            ></component>
          </div>

          <!-- <add-intro-section></add-intro-section>
          <add-text-section></add-text-section>
          <add-choice-section></add-choice-section>
          <add-ending-section></add-ending-section> -->
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
  props: {
    chapterNumber: Number,
  },
  data() {
    return {
      chapterActivated: false,
      currentSectionID: 0,
      currentSectionData: {},
      chapterID: this.chapterNumber - 1,
      chapterName: "Chapter" + " " + this.chapterNumber,
      chapterTimeline: [
        {
          id: 0,
          SectionType: "Intro",
          SectionComponent: "AddIntroSection",
          SectionData: {},
        },
        {
          id: 1,
          SectionType: "TextSection",
          SectionComponent: "AddTextSection",
          SectionData: [],
        },
        {
          id: 2,
          SectionType: "ChoiceSection",
          SectionComponent: "AddChoiceSection",
          SectionData: {},
        },
        {
          id: 3,
          SectionType: "TextSection",
          SectionComponent: "AddTextSection",
          SectionData: [],
        },
        {
          id: 4,
          SectionType: "ChoiceSection",
          SectionComponent: "AddChoiceSection",
          SectionData: {},
        },
        {
          id: 5,
          SectionType: "Ending",
          SectionComponent: "AddEndingSection",
          SectionData: {},
        },
      ],
    };
  },
  watch: {
    currentSectionData() {
      // In this method, take that data and ID, and emit an event.
      this.chapterTimeline[
        this.currentSectionID
      ].SectionData = this.currentSectionData;
      
      const chapterData = this.chapterTimeline.map(
        ({ SectionType, SectionData }) => ({ SectionType, SectionData })
      );

      this.$emit("updateChapterData", {
        ChapterID: this.chapterID,
        ChapterName: this.chapterName,
        ChapterData: chapterData,
      });
    },
  },
  methods: {
    updateCurrentSectionID(value) {
      this.currentSectionID = value;
    },
    updateComponentData(value) {
      console.log("value: " + JSON.stringify(value));
      this.currentSectionData = JSON.parse(value);
    },
    activateChapter() {
      console.log("ActivateChapter() hit.");
      this.$emit("addChapter");
      this.chapterActivated = true;
    },
    removeChapter() {
      this.$emit("removeChapter", this);
    },
    reorderChapterItems() {
      console.log("ReorderChapterItems() hit.");
    },
  },
  mounted() {
    console.log("mounted() chapterID: " + this.chapterID);
    this.chapterActivated = true;
  },
};
</script>

<style scoped>
.v-icon.clickable:hover {
  opacity: 0.6;
  cursor: pointer;
}
.v-icon.clickable::after {
  display: none !important;
}
</style>