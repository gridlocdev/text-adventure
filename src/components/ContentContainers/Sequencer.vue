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
        :questionText="this.ChoiceSection.questionText"
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
    SequencerIndex(newValue) {
      // When the SequencerIndex is updated, show the correct component and update its data.
      if (newValue < this.chapterTimeline.length) {
        this.sequenceIndex = newValue;
        this.sequenceIndexComponentType = this.chapterTimeline[
          this.sequenceIndex
        ][1];
        this.advanceChapterTimeline();
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
      sequenceIndex: localStorage.getItem("SequencerIndex"),
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
        questionText: "",
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
      const chapterSections = JSON.parse(this.jsonPayload);

      var introData;
      var textSectionData;
      var choiceSectionData;
      var endingData;

      for (var i = 0; i < chapterSections.length; i++) {
        var tempSectionType = chapterSections[i].SectionType;
        switch (tempSectionType) {
          case "Intro":
            if (!introData) {
              introData = chapterSections[i].SectionData;
            }
            break;
          case "TextSection":
            if (!textSectionData) {
              textSectionData = chapterSections[i].SectionData;
            }
            break;
          case "ChoiceSection":
            if (!choiceSectionData) {
              choiceSectionData = chapterSections[i].SectionData;
            }
            break;
          case "Ending":
            if (!endingData) {
              endingData = chapterSections[i].SectionData;
            }
            break;
          default:
            break;
        }
      }

      // Sets data for Intro
      if (introData) {
        this.setSequencerIntroData(introData.title, introData.subText);
      }
      // Sets data for the TextSections
      if (textSectionData) {
        this.setSequencerTextSectionData(
          JSON.parse(JSON.stringify(textSectionData))
        );
      }
      // Sets data for the ChoiceSections
      if (choiceSectionData) {
        this.setSequencerChoiceSectionData(
          choiceSectionData.questionText,
          choiceSectionData.choices.choice1,
          choiceSectionData.choices.choice2,
          choiceSectionData.choicesMetadata.correctChoice,
          choiceSectionData.choicesMetadata.gameOverText,
          choiceSectionData.choicesMetadata.successText
        );
      }

      // Sets data for the Ending
      if (endingData) {
        this.setSequencerEndingData(endingData.title, endingData.subText);
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
      questionText,
      choice1,
      choice2,
      correctChoice,
      gameOverText,
      successText
    ) {
      // Sets the Sequencer's data for the ChoiceSections
      this.ChoiceSection.questionText = questionText;
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
      const chapterSections = JSON.parse(this.jsonPayload);

      this.chapterJSON = chapterSections;
      // Loop through the JSON to create our Timeline (To show and hide elements)
      var timeline = [];

      for (var i = 0; i < chapterSections.length; i++) {
        switch (chapterSections[i].SectionType) {
          case "Intro":
            timeline.push([i, "Intro"]);
            break;
          case "TextSection":
            timeline.push([i, "TextSection"]);
            break;
          case "ChoiceSection":
            timeline.push([i, "ChoiceSection"]);
            break;
          case "Ending":
            timeline.push([i, "Ending"]);
            break;
        }
      }
      this.chapterTimeline = timeline;
      localStorage.setItem("ChapterTimeline", JSON.stringify(timeline));
    },
    advanceChapterTimeline() {
      // In this method:
      // Take the timeline's 2nd index (section name), and pull the appropriate data from the JSON.
      this.chapterJSON;

      var sectionType = this.chapterTimeline[this.sequenceIndex][1];
      var currentSectionData = this.chapterJSON[this.sequenceIndex].SectionData;
      switch (sectionType) {
        case "Intro":
          // Sets data for Intro
          this.setSequencerIntroData(
            currentSectionData.title,
            currentSectionData.subText
          );

          break;
        case "TextSection":
          // Sets data for the TextSections
          this.setSequencerTextSectionData(
            JSON.parse(JSON.stringify(currentSectionData))
          );
          break;
        case "ChoiceSection":
          // Sets data for the ChoiceSections
          this.setSequencerChoiceSectionData(
            currentSectionData.questionText,
            currentSectionData.choices.choice1,
            currentSectionData.choices.choice2,
            currentSectionData.choicesMetadata.correctChoice,
            currentSectionData.choicesMetadata.gameOverText,
            currentSectionData.choicesMetadata.successText
          );
          break;
        case "Ending":
          // Sets data for the Ending
          this.setSequencerEndingData(
            currentSectionData.title,
            currentSectionData.subText
          );
          break;
        default:
          break;
      }
    },
    endChapter() {
      if (
        this.$store.state.CurrentChapter < this.$store.state.NumberOfChapters
      ) {
        this.$store.dispatch("setGameInProgress", true);
        this.$store.dispatch(
          "setCurrentChapter",
          this.$store.state.CurrentChapter + 1
        );
      } else if (
        this.$store.state.CurrentChapter ==
          this.$store.state.NumberOfChapters &&
        this.$store.state.GameInProgress == true
      ) {
        this.$emit("endGame");
      } 
    },
  },
  mounted() {
    // When mounted, display the first set of data.
    this.sequenceIndex = this.$store.state.SequencerIndex;
    this.chapterTimeline = JSON.parse(localStorage.getItem("ChapterTimeline"));
    if (this.$store.state.CurrentChapter != -1) {
      this.createChapterTimeline();
      this.setInitialComponentDataFromJsonImportProp();
      this.sequenceIndexComponentType = this.chapterTimeline[
        this.sequenceIndex
      ][1];
    }

    this.$store.dispatch("setGameInProgress", true);
  },
};
</script>

<style>
</style>