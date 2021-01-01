<template v-slot:btn>
  <v-row>
    <v-col>
      <Intro
        v-if="this.sequenceIndexComponentType == 'Intro'"
        :title="this.Intro.title"
        :subText="this.Intro.subText"
      ></Intro>
      <TypewriterView
        v-if="this.sequenceIndexComponentType == 'TextSection'"
        :text="this.TextSection.textArray"
      />

      <Choice
        v-if="this.sequenceIndexComponentType == 'ChoiceSection'"
        :text="this.ChoiceSection.text"
        :choice1="this.ChoiceSection.choices.choice1"
        :choice2="this.ChoiceSection.choices.choice2"
        :correctChoice="this.ChoiceSection.choicesMetadata.correctChoice"
        :gameOverText="this.ChoiceSection.choicesMetadata.gameOverText"
        :successText="this.ChoiceSection.choicesMetadata.successText"
      />
      <Ending
        v-if="this.sequenceIndexComponentType == 'Ending'"
        :title="this.Ending.title"
        :subText="this.Ending.subText"
        v-on:endChapter="endChapter"
      ></Ending>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

import Intro from "../Content/Intro.vue";
import TypewriterView from "./TypewriterView.vue";
import Choice from "../Content/Choice.vue";
import Ending from "../Content/Ending.vue";

export default {
  name: "Sequencer",
  computed: mapState(["SequencerIndex", "ResetChapter"]),
  watch: {
    SequencerIndex(newValue, oldValue) {
      // When the SequencerIndex is updated, show the correct component and update its data.
      if (newValue < this.chapterTimeline.length) {
        console.log("SequencerIndex watcher: " + newValue);
        this.sequenceIndex = newValue;
        this.sequenceIndexComponentType = this.chapterTimeline[
          this.sequenceIndex
        ][1];
        this.advanceChapterTimeline();
        console.log(`Updating sequenceIndex from ${oldValue} to ${newValue}`);
      } else {
        console.log("Hit end of chapter!");
      }
    },
    ResetChapter(newValue, oldValue) {
      // When the Chapter reset flag is true, reset the chapter's data
      if (oldValue == true) {
        this.setInitialComponentDataFromJsonImportProp();
        this.$store.dispatch("setSequencerIndex", 0);
      } else {
        // setting false to True
        this.$store.state.ResetChapter = false;
      }
    },
  },
  components: {
    Intro,
    TypewriterView,
    Choice,
    Ending,
  },
  props: {
    // It's JSON, but Vue doesn't want me to pass JSON through props.
    jsonPayload: String,
  },
  data: function () {
    return {
      sequenceIndex: 0,
      sequenceIndexComponentType: "",
      chapterTimeline: [],
      endSequence: false,
      chapterJSON: {},
      Intro: {
        title: "",
        subText: "",
      },
      TextSection: {
        textArray: [],
      },
      ChoiceSection: {
        choices: {
          choice1: "",
          choice2: "",
        },
        choicesMetadata: {
          correctChoice: "",
          gameOverText: "",
          successText: "",
        },
      },
      Ending: {
        title: "",
        subText: "",
      },
    };
  },
  methods: {
    incrementSequence() {
      this.$store.dispatch(
        "setSequencerIndex",
        this.$store.state.SequencerIndex + 1
      );
      this.sequenceIndex = this.$store.state.SequencerIndex;
      // this.sequenceIndex++;
    },
    setInitialComponentDataFromJsonImportProp() {
      // Sets the starting data for the Sequencer's components' content
      const inputJSON = JSON.parse(this.jsonPayload);
      //console.log("SEQUENCER.inputJSON :" + JSON.stringify(inputJSON));
      const chapterJSON = inputJSON.MainSections[0];
      //console.log("SEQUENCER.chapterJSON :" + JSON.stringify(chapterJSON));

      // Sets data for Intro
      if (chapterJSON.Intro != undefined) {
        this.setSequencerIntroData(
          chapterJSON.Intro.title,
          chapterJSON.Intro.subText
        );
      }
      // Sets data for the TextSections
      if (chapterJSON.TextSection1 != undefined) {
        this.setSequencerTextSectionData(
          JSON.parse(JSON.stringify(chapterJSON.TextSection1))
        );
      }
      // Sets data for the ChoiceSections
      if (chapterJSON.ChoiceSection1 != undefined) {
        this.setSequencerChoiceSectionData(
          chapterJSON.ChoiceSection1.text,
          chapterJSON.ChoiceSection1.choices.choice1,
          chapterJSON.ChoiceSection1.choices.choice2,
          chapterJSON.ChoiceSection1.choicesMetadata.correctChoice,
          chapterJSON.ChoiceSection1.choicesMetadata.gameOverText,
          chapterJSON.ChoiceSection1.choicesMetadata.successText
        );
      }

      // Sets data for the Ending
      if (chapterJSON.Ending != undefined) {
        this.setSequencerEndingData(
          chapterJSON.Ending.title,
          chapterJSON.Ending.subText
        );
      }
    },
    setSequencerIntroData(title, subText) {
      this.Intro.title = title;
      this.Intro.subText = subText;
    },
    setSequencerTextSectionData(inputJSON) {
      // The following block converts the Input json to an Array.
      var textArray = [];

      for (var item in Object.keys(inputJSON)) {
        textArray.push(inputJSON[item].text.toString());
      }

      // Set the textArray to the component's data, so it can be displayed in the TypewriterView sequence.
      this.TextSection.textArray = textArray;
    },
    setSequencerChoiceSectionData(
      text,
      choice1,
      choice2,
      correctChoice,
      gameOverText,
      successText
    ) {
      // Sets the Sequencer's data for the ChoiceSections
      this.ChoiceSection.text = text;
      this.ChoiceSection.choices.choice1 = choice1;
      this.ChoiceSection.choices.choice2 = choice2;
      this.ChoiceSection.choicesMetadata.correctChoice = correctChoice;
      this.ChoiceSection.choicesMetadata.gameOverText = gameOverText;
      this.ChoiceSection.choicesMetadata.successText = successText;
    },
    setSequencerEndingData(title, subText) {
      // Sets the Sequencer's data for the Ending
      this.Ending.title = title;
      this.Ending.subText = subText;
    },
    createChapterTimeline() {
      // Creates an array that includes the sequence of component names, and the json attribute's name
      const inputJSON = JSON.parse(this.jsonPayload);
      const chapterJSON = inputJSON.MainSections[0];

      this.chapterJSON = chapterJSON;

      // Loop through the JSON to create our Timeline (To show and hide elements)
      var timeline = [];

      var i = 0;
      for (const sectionName in chapterJSON) {
        if (sectionName.includes("Intro")) {
          timeline.push([i, "Intro", sectionName]);
        } else if (sectionName.includes("TextSection")) {
          timeline.push([i, "TextSection", sectionName]);
        } else if (sectionName.includes("ChoiceSection")) {
          timeline.push([i, "ChoiceSection", sectionName]);
        } else if (sectionName.includes("Ending")) {
          timeline.push([i, "Ending", sectionName]);
        }
        i++;
      }
      this.chapterTimeline = timeline;
      console.log(timeline);
    },
    advanceChapterTimeline() {
      // In this method:
      // Take the timeline's 2nd index (section name), and pull the appropriate data from the JSON.

      var sectionName = this.chapterTimeline[this.sequenceIndex][2];
      var sectionType = this.chapterTimeline[this.sequenceIndex][1];
      switch (sectionType) {
        case "Intro":
          // Sets data for Intro
          this.setSequencerIntroData(
            this.chapterJSON[sectionName].title,
            this.chapterJSON[sectionName].subText
          );
          
          break;
        case "TextSection":
          // Sets data for the TextSections
          this.setSequencerTextSectionData(
            JSON.parse(JSON.stringify(this.chapterJSON[sectionName]))
          );
          break;
        case "ChoiceSection":
          // Sets data for the ChoiceSections
          this.setSequencerChoiceSectionData(
            this.chapterJSON[sectionName].text,
            this.chapterJSON[sectionName].choices.choice1,
            this.chapterJSON[sectionName].choices.choice2,
            this.chapterJSON[sectionName].choicesMetadata.correctChoice,
            this.chapterJSON[sectionName].choicesMetadata.gameOverText,
            this.chapterJSON[sectionName].choicesMetadata.successText
          );
          break;
        case "Ending":
          // Sets data for the Ending
          this.setSequencerEndingData(
            this.chapterJSON[sectionName].title,
            this.chapterJSON[sectionName].subText
          );
          break;
        default:
          console.log(
            "Not sure how you got here, looks like something's broken."
          );
          break;
      }
    },
    endChapter() {
      if (
        this.$store.state.CurrentChapter <= this.$store.state.NumberOfChapters
      ) {
        this.$store.dispatch(
          "setCurrentChapter",
          this.$store.state.CurrentChapter + 1
        );
        //this.setInitialComponentDataFromJsonImportProp();
      } else {
        console.log("Reached the end of the game!");
      }
    },
  },
  mounted() {
    // When mounted, display the first set of data.
    this.createChapterTimeline();
    this.setInitialComponentDataFromJsonImportProp();
    this.sequenceIndexComponentType = this.chapterTimeline[
      this.sequenceIndex
    ][1];
    console.log(this.chapterTimeline);
    console.log("SequenceIndex: " + this.sequenceIndex);
  },
};
</script>

<style>
</style>