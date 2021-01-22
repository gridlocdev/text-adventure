<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-file-input
        @change="changeFile"
        @abort="removeFile"
        accept="application/json"
        label="Insert Story (.JSON file extension)"
        show-size
        truncate-length="15"
      ></v-file-input>
    </v-row>
    <v-row v-if="jsonFileSelected == true">
      <v-col>
        <v-sheet class="ma-5 pa-5" elevation="10" outlined rounded>
          <v-row>
            <v-col class="text-left">
              <pre><code>{{ JSON.stringify(storyJSON, null, "\t") }}</code></pre>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ImportFile",
  data() {
    return {
      storyJSON: {},
      jsonFileSelected: false,
    };
  },
  methods: {
    validateImportedJSON() {
      // Validates the JSON that a user submits when importing a file.

      // Default the return value to true, if it hits any cases below turn it false.
      var returnValue = true;

      // If a chapter exists and is not null, and storyName and Icon exists
      if (
        this.storyJSON.Chapters.length != 0 ||
        this.storyJSON.StoryName.length != 0 ||
        this.storyJSON.StoryIcon.length != 0
      ) {
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
        if (returnValue == true) {
          var storyExistsAlready = false;

          for (var i = 0; i < this.$store.state.StoryJSONArray.length; i++) {
            if (
              this.$store.state.StoryJSONArray[i].StoryName ==
              this.storyJSON.StoryName
            ) {
              storyExistsAlready = true;
              break;
            }
          }

          if (storyExistsAlready == true) {
            this.$emit("fileValidationDuplicate", this.storyJSON.StoryName);
          } else {
            this.createStory();
            this.$emit("fileValidationSuccess");
          }
        } else {
          this.$emit("fileValidationError");
        }
      } else {
        this.$emit("fileValidationError");
      }
      // else if not valid, show other dialog
    },
    createStory: function () {
      this.$store.dispatch(
        "addStoryToStoryJSONArray",
        JSON.stringify(this.storyJSON)
      );
    },
    setNewStoryID() {
      // Sets a new story ID based on the maximum story ID value that exists in the user's library + 1. 

      // Loop through the current story array and find the max value of ID
      if (this.$store.state.StoryJSONArray.length > 0) {
        const maxVal = Math.max.apply(
          Math,
          this.$store.state.StoryJSONArray.map(function (output) {
            return output.StoryID;
          })
        );
        this.storyJSON.StoryID = maxVal + 1;
      } else {
        this.storyJSON.StoryID = 0;
      }
    },
    removeFile: function () {
      this.storyJSON == {};
      this.$emit("fileRemoved");
    },
    changeFile: function (file) {
      // When the user interacts with the file open dialog box, catch the appropriate event.
      try {
        if (file) {
          this.readFile(file);
        } else {
          this.jsonFileSelected = false;
          this.removeFile();
        }
      } catch (err) {
        console.log("An error has occurred.");
      }
    },
    readFile: function (file) {
      // Import the file's contents as JSON.
      try {
        const reader = new FileReader();
        this.jsonFileSelected = true;
        reader.readAsText(file);
        reader.onload = (evt) => {
          const fileText = JSON.parse(evt.target.result);
          this.storyJSON = JSON.parse(fileText);

          this.setNewStoryID();
          this.$nextTick(() => {
            this.$emit("fileImported");
          });
        };
      } catch (err) {
        console.log("Error occurred while importing file: " + err);
      }
    },
  },
};
</script>

<style scoped>
pre {
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: inherit;
}
.v-application code {
  background-color: transparent !important;
}
</style>