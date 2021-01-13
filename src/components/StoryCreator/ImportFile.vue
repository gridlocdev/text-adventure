<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-file-input
        v-on:change="importFile"
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
    <div class="text-center">
      <v-snackbar v-model="snackbar" :timeout="snackbarTimeout">
        {{ snackbarText }}

        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "ImportFile",
  data() {
    return {
      storyJSON: {},
      jsonFileSelected: false,
      snackbar: false,
      snackbarText: `SnackbarText`,
      snackbarTimeout: 3000,
      storyJSON2: {
        Chapters: [
          {
            ChapterName: "Chapter 1",
            ChapterSections: [
              {
                SectionType: "Intro",
                SectionData: {
                  title: "Chapter 1",
                  subText: "The Unruly King",
                },
              },
              {
                SectionType: "TextSection",
                SectionData: [
                  {
                    text: "You wake up.",
                  },
                  {
                    text: "The servant takes you to the castle.",
                  },
                  {
                    text: "King says hi, but you need sword.",
                  },
                ],
              },
              {
                SectionType: "ChoiceSection",
                SectionData: {
                  text: "What should you do?",
                  choices: {
                    choice1: "Option 1",
                    choice2: "Option 2",
                  },
                  choicesMetadata: {
                    correctChoice: "1",
                    gameOverText: "You cut his hand. GAMEOVER",
                    successText: "He hands you the sword, good job!",
                  },
                },
              },
              {
                SectionType: "TextSection",
                SectionData: [
                  {
                    text: "EEEEEEEEEEEEEEI am text one.",
                  },
                  {
                    text: "I am text two.",
                  },
                  {
                    text: "Huzzah!",
                  },
                ],
              },
              {
                SectionType: "ChoiceSection",
                SectionData: {
                  text: "What should you do?",
                  choices: {
                    choice1: "Option 1",
                    choice2: "Option 2",
                  },
                  choicesMetadata: {
                    correctChoice: "1",
                    gameOverText: "GAMEOVER: 2",
                    successText: "SUCCESS: 2",
                  },
                },
              },
              {
                SectionType: "Ending",
                SectionData: {
                  title: "Chapter 1 Complete!",
                  subText: "You've successfully started your journey!",
                },
              },
            ],
          },
          {
            ChapterName: "Chapter 2",
            ChapterSections: [
              {
                SectionType: "Intro",
                SectionData: {
                  title: "Chapter 2",
                  subText: "The Other Guy",
                },
              },
              {
                SectionType: "TextSection",
                SectionData: [
                  {
                    text: "A guy's there.",
                  },
                  {
                    text: "This other guy is pretty cool.",
                  },
                  {
                    text: "What's his name again? Who knows.",
                  },
                ],
              },
              {
                SectionType: "ChoiceSection",
                SectionData: {
                  text: "Should you ask his name?",
                  choices: {
                    choice1: "Heck yeah",
                    choice2: "Nah, im good",
                  },
                  choicesMetadata: {
                    correctChoice: "1",
                    gameOverText: "He roundhouse kicks u into the atmosphere.",
                    successText:
                      "My name is... Chuck norris. Here's 10 million dollars.",
                  },
                },
              },
              {
                SectionType: "TextSection",
                SectionData: [
                  {
                    text:
                      "Now equipped with 10 million dollars, you set your sights on the moon.",
                  },
                  {
                    text:
                      "You call NASA, but they aren't too interested in your offer.",
                  },
                  {
                    text:
                      "10 million is a lot, but you might not be able to go to the moon with that.",
                  },
                ],
              },
              {
                SectionType: "ChoiceSection",
                SectionData: {
                  text: "You need more money, what should you do?",
                  choices: {
                    choice1: "Become a hotdog stand guy",
                    choice2: "Go begging in old school runescape",
                  },
                  choicesMetadata: {
                    correctChoice: "2",
                    gameOverText:
                      "You end up liking hot dogs so much that u explode",
                    successText:
                      "You find a runescape player that's sick nasty and gives you 400 billion GP",
                  },
                },
              },
              {
                SectionType: "Ending",
                SectionData: {
                  title: "Chapter 2 Complete!",
                  subText: "You're rich! Muahahahahaaaaa",
                },
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    importFile: function (file) {
      try {
        const fileName = file.name;
        this.readFile(file);
        this.snackbarText = `${fileName} imported successfully!`;
        this.snackbar = true;
        console.log(fileName);
      } catch (err) {
        console.log("An error has occurred.");
      }
    },
    readFile: function (file) {
      const reader = new FileReader();
      this.jsonFileSelected = true;
      reader.readAsText(file);
      reader.onload = (evt) => {
        const fileText = JSON.parse(evt.target.result);
        this.storyJSON = JSON.parse(fileText);
        console.log(fileText);
      };
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