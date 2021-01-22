<template>
  <v-container>
    <v-app-bar outlined fixed class="mt-14">
      <v-tabs fixed-tabs mandatory v-model="currentTab">
        <v-tab> 1. Name Your Story </v-tab>
        <v-tab :disabled="!tabNextButton.tab0"> 2. Add Chapters </v-tab>
        <v-tab :disabled="!tabNextButton.tab1"> 3. Confirm and Save </v-tab>
      </v-tabs>
    </v-app-bar>
    <v-row
      class="my-5 animate__animated animate__fadeIn"
      style="animation-duration: 0.25s"
      v-show="currentTab == 0"
      no-gutters
    >
      <v-col>
        <v-row class="ma-5">
          <v-col align="center" justify="center">
            <h1>Story Details</h1>
          </v-col>
        </v-row>

        <v-row align="center" justify="center">
          <v-col cols="6">
            <v-text-field
              v-model="storyJSON.StoryName"
              class="pa-5"
              label="New Story Name"
              hide-details="auto"
            />
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="8">
            <v-text-field
              v-model="storyJSON.StoryDescription"
              class="pa-5"
              label="Description (Optional)"
              hide-details="auto"
            />
          </v-col>
        </v-row>
        <v-row no-gutters class="my-5 mx-2 d-flex">
          <v-col align="center" justify="center" cols="6">
            <v-text-field
              prefix="mdi-"
              v-model="storyJSON.StoryIcon"
              class="pa-5"
              label="Story Icon (e.g. 'mdi-cat, mdi-book, mdi-delta')"
              outlined
              hide-details="auto"
            />
          </v-col>
          <v-col class="my-auto" cols="1" align="center" justify="center">
            <v-btn class="nohover" icon depressed disabled>
              <v-icon v-if="storyJSON.StoryIcon.length == 0"
                >mdi-book-open-blank-variant</v-icon
              >
              <v-icon v-if="storyJSON.StoryIcon.length != 0"
                >mdi-{{ storyJSON.StoryIcon }}</v-icon
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
                  <h3>Icons from Material Design Icons</h3>
                </span>
              </v-row>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="my-3 mx-10">
          <v-col v-show="!tabNextButton.tab0" align="center" justify="center">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <v-btn disabled large @click="nextTab()" elevation="5">
                    <span><strong> Next </strong></span></v-btn
                  >
                </span>
              </template>
              <span>Fill out the remaining details above to continue!</span>
            </v-tooltip>
          </v-col>
          <v-col v-show="tabNextButton.tab0" align="center" justify="center">
            <v-btn large @click="nextTab()" elevation="5">
              <span><strong> Next </strong></span></v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-show="currentTab == 1">
      <v-container class="my-5">
        <v-row class="mt-13">
          <v-col align="center" justify="center">
            <h1>Create Story Chapters</h1>
          </v-col>
        </v-row>
        <add-chapter
          v-for="(chapter, index) in storyJSON.Chapters"
          :key="chapter.ChapterID"
          :chapterID="index"
          :chapterNumber="index + 1"
          v-on:removeChapter="removeChapter"
          @updateChapterSections="updateChapterSections"
        ></add-chapter>
        <v-btn
          @click="
            () => {
              storyJSON.Chapters.push({
                ChapterID: numberOfChaptersCreated,
                ChapterIcon: '',
                ChapterName: 'Chapter ' + numberOfChapters,
                ChapterSections: [],
              });
              numberOfChaptersCreated++;
            }
          "
          class="pa-2 my-5"
          elevation="5"
          block
          ><v-icon>mdi-plus</v-icon>
          <span class="mx-2"
            ><strong> Add Chapter {{ this.numberOfChapters + 1 }}</strong></span
          ></v-btn
        >
        <v-divider></v-divider>
        <v-row class="my-5 mx-10">
          <!-- :disabled="!tabNextButton.tab1" -->
          <v-col v-show="!tabNextButton.tab1" align="center" justify="center">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <v-btn disabled large @click="nextTab()" elevation="5">
                    <span><strong> Next </strong></span></v-btn
                  >
                </span>
              </template>
              <span
                >Looks like you're missing some things up above. Check out and
                fix what's empty or outlined in red!</span
              >
            </v-tooltip>
          </v-col>
          <v-col v-show="tabNextButton.tab1" align="center" justify="center">
            <v-btn large @click="nextTab()" elevation="5">
              <span><strong> Next </strong></span></v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <v-row class="my-5" v-show="currentTab == 2">
      <v-container>
        <v-row class="ma-5">
          <v-col align="center" justify="center">
            <v-row class="pb-5">
              <v-col align="center" justify="center">
                <h1>Export your Story</h1>
              </v-col>
            </v-row>
            <export-file
              @createStory="createStory"
              @returnToStartingTab="returnToStartingTab"
              :storyJSON="JSON.stringify(storyJSON)"
            ></export-file>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
// Component Description:
// This is a page where users can create their own story files for download and play.

import AddChapter from "../components/StoryCreator/AddChapter.vue";
import ExportFile from "../components/StoryCreator/ExportFile.vue";

export default {
  components: {
    AddChapter,
    ExportFile,
  },
  data() {
    return {
      tabNextButton: {
        tab0: false,
        tab1: false,
        tab2: false,
      },
      storyID: 0,
      currentChapterData: {},
      currentTab: 0,
      numberOfChaptersCreated: 0,
      storyJSON: {
        StoryID: 0,
        StoryDescription: "",
        StoryName: "",
        StoryIcon: "",
        Chapters: [],
      },
    };
  },
  computed: {
    numberOfChapters: function () {
      return this.storyJSON.Chapters.length;
    },
  },
  watch: {
    storyJSON: {
      handler: function () {
        this.routeTabValidation();
      },
      deep: true,
    },
  },
  methods: {
    routeTabValidation() {
      // Validate the JSON based on what tab the user is on.
      switch (this.currentTab) {
        case 0:
          this.validateTab0();
          break;
        case 1:
          this.validateTab1();
          break;
        case 2:
          // Have not made it yet

          break;
      }
    },
    validateTab0() {
      // In short, it checks to see if
      if (this.storyJSON.StoryName.length > 0) {
        this.validateTab0Icon();
      } else {
        this.tabNextButton.tab0 = false;
      }
    },
    validateTab0Icon() {
      // Validates the icon selector box, to see if it's valid or empty. If neither, returns false.
      this.$nextTick(() => {
        // If the Story Name has stuff in it
        if (this.storyJSON.StoryIcon.length == 0) {
          this.tabNextButton.tab0 = true;
        } else {
          // Text in box: check if the Story Icon shows something
          var iconElement = document.querySelector(
            ".v-btn.v-btn--disabled.nohover .v-icon.mdi"
          );
          if (iconElement) {
            var iconContent = getComputedStyle(iconElement, ":before").content;
            if (iconContent.toString() != "none") {
              this.tabNextButton.tab0 = true;
            } else {
              this.tabNextButton.tab0 = false;
            }
          } else {
            this.tabNextButton.tab0 = false;
          }
        }
      });
    },
    validateTab1() {
      // Validates storyJSON for tab1's inputs to see if the appropriate data exists in the JSON

      // Default the return value to true, if it hits any cases below turn it false.
      var returnValue = true;

      // If a chapter exists and is not null
      if (this.numberOfChapters != 0) {
        // For each section in each chapter
        this.storyJSON.Chapters.forEach((chapter) => {
          if (chapter.ChapterSections.length != 0) {
            chapter.ChapterSections.forEach((section) => {
              // If any of the sections contains data, check the SectionType and validate
              if (Object.keys(section.SectionData).length !== 0) {
                switch (section.SectionType) {
                  case "Intro":
                    if (
                      section.SectionData.title.length == 0 ||
                      section.SectionData.subText.length == 0 ||
                      !section.SectionData.title ||
                      !section.SectionData.subText
                    ) {
                      returnValue = false;
                    }
                    break;
                  case "TextSection":
                    for (var i = 0; i < section.SectionData.length; i++) {
                      if (!section.SectionData[i].text) {
                        returnValue = false;
                      }
                    }
                    break;
                  case "ChoiceSection":
                    if (
                      section.SectionData.questionText.length == 0 ||
                      section.SectionData.choices.choice1.length == 0 ||
                      section.SectionData.choices.choice2.length == 0 ||
                      section.SectionData.choicesMetadata.gameOverText.length ==
                        0 ||
                      section.SectionData.choicesMetadata.successText.length ==
                        0 ||
                      !section.SectionData.questionText ||
                      !section.SectionData.choices.choice1 ||
                      !section.SectionData.choices.choice2 ||
                      !section.SectionData.choicesMetadata.gameOverText ||
                      !section.SectionData.choicesMetadata.successText
                    ) {
                      returnValue = false;
                    }
                    break;
                  case "Ending":
                    if (
                      section.SectionData.title.length == 0 ||
                      section.SectionData.subText.length == 0 ||
                      !section.SectionData.title ||
                      !section.SectionData.subText
                    ) {
                      returnValue = false;
                    }
                    break;
                }
              } else {
                returnValue = false;
              }
            });
          } else {
            returnValue = false;
          }
        });
        this.tabNextButton.tab1 = returnValue;
        if (returnValue == true) {
          this.validateTab1Icon();
        }
      }
    },
    validateTab1Icon() {
      // Validates the icon selector box, to see if it's valid or empty. If neither, returns false.

      this.$nextTick(() => {
        // For each icon name in

        // Text in box: check if the Story Icon shows something
        var iconElements = document.querySelectorAll(
          ".v-btn.v-btn--disabled.nohover .v-icon.mdi"
        );
        iconElements.forEach((iconElement) => {
          if (iconElement) {
            var iconContent = getComputedStyle(iconElement, ":before").content;
            if (iconContent.toString() != "none") {
              this.tabNextButton.tab1 = true;
            } else {
              this.tabNextButton.tab1 = false;
            }
          } else {
            this.tabNextButton.tab1 = false;
          }
        });
      });
    },
    nextTab() {
      // Handles what happens with navigation via the Next buttons or header tabs.
      switch (this.currentTab) {
        case 0:
          // If there's no icon text, default the icon to this
          if (this.storyJSON.StoryIcon.length == 0) {
            this.storyJSON.StoryIcon = "book-open-blank-variant";
          }
          break;
        case 1:
          for (var i = 0; i < this.storyJSON.Chapters.length; i++) {
            if (this.storyJSON.Chapters[i].ChapterIcon.length == 0) {
              this.storyJSON.Chapters[i].ChapterIcon = "delta";
            }
          }
          break;
        case 2:
          break;
      }
      this.currentTab++;
    },
    resetStoryCreator() {
      // Resets the component's data to what it was at the start.
      this.currentChapterData = {};
      this.currentTab = 0;
      this.numberOfChaptersCreated = 0;
      this.storyJSON = {
        StoryID: this.storyID,
        StoryDescription: "",
        StoryName: "",
        StoryIcon: "",
        Chapters: [],
      };
      this.tabNextButton = {
        tab0: false,
        tab1: false,
        tab2: false,
      };
    },
    setNewStoryID() {
      // Loop through the current story array and find the max value of ID

      if (this.$store.state.StoryJSONArray.length > 0) {
        const maxVal = Math.max.apply(
          Math,
          this.$store.state.StoryJSONArray.map(function (output) {
            return output.StoryID;
          })
        );
        this.storyJSON.StoryID = maxVal + 1;
        this.storyID = maxVal + 1;
      } else {
        this.storyJSON.StoryID = 0;
        this.storyID = 0;
      }
    },
    returnToStartingTab() {
      this.currentTab = 0;
    },
    createStory() {
      this.dialog = true;

      this.setNewStoryID();

      this.$store.dispatch(
        "addStoryToStoryJSONArray",
        JSON.stringify(this.storyJSON)
      );

      this.resetStoryCreator();
      this.saveButtonDisabled = true;
    },
    updateChapterSections(value) {
      this.currentChapterData = value;
      this.storyJSON.Chapters[
        this.currentChapterData.ChapterID
      ] = this.currentChapterData;
      this.routeTabValidation();
    },
    addChapter() {
      // Modify the storyJSON, add this chapter in the index it was created in.
      this.storyJSON.Chapters.push({
        ChapterID: this.numberOfChaptersCreated,
        ChapterIcon: "",
        ChapterName: "Chapter " + this.numberOfChapters,
        ChapterSections: [],
      });
      console.log("AddChapter() hit.");
      this.numberOfChaptersCreated++;
    },
    removeChapter(chapterID) {
      // Removes a chapter with the specified ID

      this.currentChapterData = {};
      // Splice the one that has that ID

      const arrayOfChapterIDsInStoryOrder = this.storyJSON.Chapters.map(
        ({ ChapterID }) => ChapterID
      );

      const chapterIDInIndex = arrayOfChapterIDsInStoryOrder.indexOf(chapterID);
      this.storyJSON.Chapters.splice(chapterIDInIndex, 1);
    },
  },
  mounted() {},
};
</script>

<style scoped>
.v-btn.v-btn--disabled.nohover .v-icon {
  color: black !important;
  opacity: 1;
}
.v-btn.v-btn--disabled.nohover.theme--dark .v-icon {
  color: white !important;
  opacity: 1;
}
</style>