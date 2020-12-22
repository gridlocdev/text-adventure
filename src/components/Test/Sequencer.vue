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
        @incrementSequence="incrementSequence()"
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
        Header="Chapter Complete!"
        SubText="Chapter 1 is compolete."
      ></Ending>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

import Intro from "../Sub-Components/Intro.vue";
import TypewriterView from "./TypewriterView.vue";
import Choice from "../Sub-Components/Choice.vue";
import Ending from "../Sub-Components/Ending.vue";
// The Sequencer component should take in every component inside of it, and set a priority for what gets displayed. I've got the same thing already right now with the other thing.

//import Typewriter from "../Sub-Components/Typewriter.vue";

export default {
  name: "Sequencer",
  computed: mapState(["SequencerIndex", "ResetChapter"]),
  watch: {
    SequencerIndex(newValue, oldValue) {
      // When the SequencerIndex is updated, show the correct component and update its data.
      this.sequenceIndex = newValue;
      this.sequenceIndexComponentType = this.chapterTimeline[
        this.sequenceIndex
      ][1];
      this.advanceChapterTimeline();
      console.log(
        `Updating Chapter Component Index from ${oldValue} to ${newValue}`
      );
    },
    ResetChapter(newValue, oldValue) {
      // When the Chapter reset flag is true, reset the chapter's data
      if (oldValue == true) {
        this.setInitialComponentDataFromJsonImportProp();
        this.$store.dispatch("setSequencerIndex", 0);
      } else {
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
      this.$store.state.SequenceIndex++;
      this.sequenceIndex++;
    },
    setInitialComponentDataFromJsonImportProp() {
      // Sets the starting data for the Sequencer's components' content
      const inputJSON = JSON.parse(this.jsonPayload);
      const chapterJSON = inputJSON.MainSections[0];

      // Sets data for Intro
      this.setSequencerIntroData(
        chapterJSON.Intro.title,
        chapterJSON.Intro.subText
      );
      // Sets data for the TextSections
      this.setSequencerTextSectionData(
        JSON.parse(JSON.stringify(chapterJSON.TextSection1))
      );

      // Sets data for the ChoiceSections
      this.setSequencerChoiceSectionData(
        chapterJSON.ChoiceSection1.text,
        chapterJSON.ChoiceSection1.choices.choice1,
        chapterJSON.ChoiceSection1.choices.choice2,
        chapterJSON.ChoiceSection1.choicesMetadata.correctChoice,
        chapterJSON.ChoiceSection1.choicesMetadata.gameOverText,
        chapterJSON.ChoiceSection1.choicesMetadata.successText
      );

      // Sets data for the Ending
      this.setSequencerEndingData(
        chapterJSON.Ending.title,
        chapterJSON.Ending.subText
      );
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
      console.log("AdvanceTimeline() SWITCH HIT:");
      switch (sectionType) {
        case "Intro":
          // Sets data for Intro
          this.setSequencerIntroData(
            this.chapterJSON[sectionName].title,
            this.chapterJSON[sectionName].subText
          );
          console.log(
            "AdvanceTimeline() (Intro): " + this.chapterJSON[sectionName].title,
            this.chapterJSON[sectionName].subText
          );
          //this.Intro = this.chapterJSON[sectionName];
          break;
        case "TextSection":
          // Sets data for the TextSections
          this.setSequencerTextSectionData(
            JSON.parse(JSON.stringify(this.chapterJSON[sectionName]))
          );
          console.log(
            "AdvanceTimeline() (TextSection): " +
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
          console.log(
            "AdvanceTimeline() (ChoiceSection): " +
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
          console.log(
            "AdvanceTimeline() (Ending): " +
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

      console.log("advanceChapterTimeline() hit.");
    },
  },
  mounted() {
    // When mounted, display the first set of data.
    this.createChapterTimeline();
    this.setInitialComponentDataFromJsonImportProp();
    this.sequenceIndexComponentType = this.chapterTimeline[
      this.sequenceIndex
    ][1];
    console.log("SequenceIndex: " + this.sequenceIndex);
  },
};
</script>

<style>
</style>