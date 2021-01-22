<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet
          class="chapterSheet pa-2 mt-10"
          elevation="10"
          outlined
          rounded
        >
          <v-row class="mx-2 d-flex">
            <v-icon dense class="ma-2"> mdi-folder-plus </v-icon>
            <h2 class="my-4">{{ chapterName }}</h2>
            <v-btn
              tabindex="-1"
              class="my-auto ml-auto"
              icon
              depressed
              @click="removeChapter()"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-row>
          <v-row no-gutters class="mx-2 d-flex">
            <v-col align="center" justify="center" cols="6">
              <v-text-field
                prefix="mdi-"
                v-model="chapterIcon"
                class="pa-5"
                label="Chapter Icon (e.g. 'mdi-delta')"
                outlined
                hide-details="auto"
              />
            </v-col>
            <v-col class="my-auto" cols="1" align="center" justify="center">
              <v-btn class="nohover" icon depressed disabled>
                <v-icon v-if="chapterIcon.length == 0">mdi-delta</v-icon>
                <v-icon v-if="chapterIcon.length != 0">
                  mdi-{{ chapterIcon }} }}</v-icon
                >
              </v-btn>
            </v-col>
            <v-divider vertical class="my-3"></v-divider>
            <v-col align="center" justify="center" class="mx-5 my-auto">
              <v-btn
                block
                href="https://materialdesignicons.com/"
                target="_blank"
              >
                <v-icon class="">mdi-link</v-icon>
                <v-row>
                  <span class="ml-5 mr-3">
                    <h3>Material Design Icons</h3>
                  </span>
                </v-row>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider class="mx-5 my-3"></v-divider>

          <div v-for="section in chapterTimeline" :key="section.id">
            <component
              :is="section.SectionComponent"
              :sectionID="section.id"
              @sectionModified="updateCurrentSectionID"
              @updateComponentData="updateComponentData"
            ></component>
          </div>
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
    chapterID: Number,
    chapterNumber: Number,
  },
  computed: {
    chapterName: function () {
      return "Chapter" + " " + this.chapterNumber;
    },
  },
  data() {
    return {
      currentSectionID: 0,
      currentSectionData: {},
      chapterIcon: "",
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
    currentSectionData: function () {
      this.updateChapterData();
    },
    chapterIcon: function () {
      this.updateChapterData();
    },
  },
  methods: {
    updateChapterData() {
      // Passes chapter data to the parent component.

      this.chapterTimeline[
        this.currentSectionID
      ].SectionData = this.currentSectionData;

      const chapterSections = this.chapterTimeline.map(
        ({ SectionType, SectionData }) => ({ SectionType, SectionData })
      );
      this.$emit("updateChapterSections", {
        ChapterID: this.chapterID,
        ChapterIcon: this.chapterIcon,
        ChapterName: this.chapterName,
        ChapterSections: chapterSections,
      });
    },
    updateCurrentSectionID(value) {
      this.currentSectionID = value;
    },
    updateComponentData(value) {
      this.currentSectionData = JSON.parse(value);
    },
    removeChapter() {
      this.$emit("removeChapter", this.chapterID);
    },
  },
};
</script>

<style scoped>
.v-btn.v-btn--disabled.nohover .v-icon {
  color: white !important;
  opacity: 1;
}
</style>