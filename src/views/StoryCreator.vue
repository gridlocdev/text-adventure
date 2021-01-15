<template>
  <v-container>
    <v-tabs fixed-tabs mandatory v-model="currentTab">
      <v-tab> 1. Name Your Story </v-tab>
      <v-tab :disabled="!tabNextButton.tab0"> 2. Add Chapters </v-tab>
      <v-tab :disabled="!tabNextButton.tab1"> 3. Confirm and Save </v-tab>
    </v-tabs>
    <v-row v-show="currentTab == 0" no-gutters>
      <v-col>
        <v-row class="pt-5">
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
        <v-row no-gutters class="mx-2 d-flex">
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
        <v-divider class="my-5"></v-divider>
        <v-row class="my-5 mx-10">
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
      <v-container>
        <add-chapter
          v-for="chapterNumber in numberOfChapters + 1"
          :key="chapterNumber"
          :chapterNumber="chapterNumber"
          v-on:addChapter="addChapter"
          v-on:removeChapter="removeChapter"
          @updateChapterSections="updateChapterSections"
        ></add-chapter>
        <v-divider class="my-5"></v-divider>
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
              <span>Add a story before you click Create!</span>
            </v-tooltip>
          </v-col>
          <v-col v-show="!tabNextButton.tab1" align="center" justify="center">
            <v-btn large @click="nextTab()" elevation="5">
              <span><strong> Next </strong></span></v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <v-row v-show="currentTab == 2">
      <v-container>
        <v-row class="ma-5">
          <v-col align="center" justify="center">
            <v-row class="pb-5">
              <v-col align="center" justify="center">
                <h1>Export your Story</h1>
              </v-col>
            </v-row>
            <export-file :storyJSON="JSON.stringify(storyJSON)"></export-file>
          </v-col>
        </v-row>
        <v-divider class="my-5"></v-divider>
        <v-row class="my-5 mx-10">
          <v-col v-show="!tabNextButton.tab1" align="center" justify="center">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <v-btn disabled large @click="createStory()" elevation="5">
                    <span
                      ><strong> Add Story to Browser Cache </strong></span
                    ></v-btn
                  >
                </span>
              </template>
              <span>Add a story before you click Create!</span>
            </v-tooltip>
          </v-col>
          <v-col v-show="tabNextButton.tab1" align="center" justify="center">
            <v-btn large @click="createStory()" elevation="5">
              <span><strong> Add Story to Browser Cache </strong></span></v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
//import chapterSectionDraggables from "../components/Draggables/ChapterSectionDraggables.vue";
import AddChapter from "../components/StoryCreator/AddChapter.vue";
import ExportFile from "../components/StoryCreator/ExportFile.vue";

export default {
  components: {
    AddChapter,
    ExportFile,
    //  chapterSectionDraggables,
  },
  data() {
    return {
      tabNextButton: {
        tab0: false,
        tab1: false,
        tab2: false,
      },
      storyID: 0,
      currentChapterID: 0,
      currentChapterData: {},
      numberOfChapters: 0,
      currentTab: 0,
      storyJSON: {
        StoryID: 0,
        StoryName: "",
        StoryIcon: "",
        Chapters: [{}],
      },
    };
  },
  watch: {
    storyJSON: {
      handler: function (newVal) {
        switch (this.currentTab) {
          case 0:
            this.validateTab0();
            break;
          case 1:
            // Have not made it yet
            this.validateTab1();
            break;
          case 2:
            // Have not made it yet
            this.validateTab2();
            break;
        }
        console.log(newVal);
      },
      deep: true,
    },
  },
  methods: {
    validateTab0() {
      // In short, it checks to see if
      console.log("Story Name: " + this.storyJSON.StoryName);

      console.log("Story Icon: " + this.storyJSON.StoryIcon);

      this.$nextTick(() => {
        // If the Story Name has stuff in it
        if (this.storyJSON.StoryName.length > 0) {
          if (this.storyJSON.StoryIcon.length == 0) {
            console.log("1");
            this.tabNextButton.tab0 = true;
          } else {
            console.log("NextTick Hit.");
            // Text in box: check if the Story Icon shows something
            var iconElement = document.querySelector(
              ".v-btn.v-btn--disabled.nohover .v-icon.mdi"
            );
            console.log(iconElement);
            if (iconElement) {
              var iconContent = getComputedStyle(iconElement, ":before")
                .content;
              if (iconContent.toString() != "none") {
                console.log(iconContent.toString());
                console.log("2");

                this.tabNextButton.tab0 = true;
              } else {
                console.log(iconContent.toString());
                console.log("3");
                this.tabNextButton.tab0 = false;
              }
            } else {
              console.log("4");
              this.tabNextButton.tab0 = false;
            }
          }
        } else {
          console.log("5");
          this.tabNextButton.tab0 = false;
        }
        console.log("Reached end of function!");
      });
    },
    nextTab() {
      switch (this.currentTab) {
        case 0:
          // If there's an icon selected, the prefix has "mdi-" which is 4 characters
          if (
            !this.storyJSON.StoryIcon.includes("mdi-") &&
            this.storyJSON.StoryIcon.length <= 4
          ) {
            this.storyJSON.StoryIcon = "mdi-book-open-variant";
          }
          break;
        case 1:
          break;
        case 2:
          break;
      }
      this.currentTab++;
    },
    resetStoryJSON() {
      this.storyJSON = {
        StoryID: this.storyID,
        StoryName: "",
        StoryIcon: "",
        Chapters: [{}],
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
        console.log("LENGTH: " + this.$store.state.StoryJSONArray.length);
        this.storyJSON.StoryID = 0;
        this.storyID = 0;
      }
    },
    createStory() {
      console.log(
        "$1 Story Added to StoryJSONArray: " + JSON.stringify(this.storyJSON)
      );

      this.setNewStoryID();

      this.$store.dispatch(
        "addStoryToStoryJSONArray",
        JSON.stringify(this.storyJSON)
      );

      this.resetStoryJSON();
    },

    updateChapterSections(value) {
      console.log("updateChapterSections: " + JSON.stringify(value));
      console.log(value);
      this.currentChapterData = value;
      this.storyJSON.Chapters[
        this.currentChapterData.ChapterID
      ] = this.currentChapterData;
      console.log(JSON.stringify(this.storyJSON));
    },
    setChapterSectionData(id, data) {
      console.log(id, data);
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
  mounted() {
    console.log(
      "This state's json stuff" +
        JSON.stringify(this.$store.state.StoryJSONArray, null, 2)
    );
    console.log("StoryID = " + this.storyID);
  },
};
</script>

<style scoped>
/* .v-btn.v-btn--disabled .v-btn__content i::before {
  content: "";
} */
.v-btn.v-btn--disabled.nohover .v-icon {
  color: black !important;
  opacity: 1;
}
.v-btn.v-btn--disabled.nohover.theme--dark .v-icon {
  color: white !important;
  opacity: 1;
}
</style>