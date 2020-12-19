<template v-slot:btn>
  <v-row>
    <!-- <v-btn @click="sequenceIndex++"> Add 1 to Sequence </v-btn> -->
    <v-col>
      <!-- <Typewriter
        text="The squire clues you in. “Now that that part is out of the way, there are two paths you can take to the Dragon’s mountain. You can take the short route, brave the rough terrain on your steed through the Valley, and arrive in a matter of days; or you can take the unreasonably complicated and long route through the Bridge and the Forest!”"
      /> -->
      <typewriter-view :text="['Text 1', 'Text 2']"/>
      <!-- <Choice
        text="A hooded man is in the alleyway nearest you. You see he's stolen a woman's purse! What do you do next?"
        choice1="Chase Him"
        choice2="Run Away"
        correctChoice="2"
      /> -->

      <!-- <span id="displayJSONhere">
        {{ JSON.parse(jsonPayload) }}
      </span> -->
      <!-- <slot name="chapterContent">This is default if nothing shows up here.</slot> -->
    </v-col>
  </v-row>
</template>

<script>
import TypewriterView from './TypewriterView.vue';
// The Sequencer component should take in every component inside of it, and set a priority for what gets displayed. I've got the same thing already right now with the other thing.

//import Choice from "../Sub-Components/Choice.vue";
//import Typewriter from "../Sub-Components/Typewriter.vue";

export default {
  name: "Sequencer",
  components: {
    TypewriterView
    // Choice,
    // Typewriter,
  },
  props: {
    // It's JSON, but Vue doesn't want me to pass JSON through props.
    jsonPayload: String,
  },
  data: function () {
    return {
      sequenceIndex: 0,
      endSequence: false,
      Intro: {
        title: String,
        subText: String,
      },
      TextSection: {
        text: String,
      },
      ChoiceSection: {
        choices: {
          choice1: String,
          choice2: String,
        },
        choicesMetadata: {
          correctChoice: Number,
          gameOverText: String,
        },
      },
      Ending: {
        title: String,
        subText: String,
      },
    };
  },
  methods: {
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
      this.setSequencerTextSectionData(chapterJSON.TextSection1[0].text);

      // Sets data for the ChoiceSections
      this.setSequencerChoiceSectionData(
        chapterJSON.ChoiceSection1.text,
        chapterJSON.ChoiceSection1.choices.choice1,
        chapterJSON.ChoiceSection1.choices.choice2,
        chapterJSON.ChoiceSection1.choicesMetadata.correctChoice,
        chapterJSON.ChoiceSection1.choicesMetadata.gameOverText
      );

      // Sets data for the Ending
      this.setSequencerEndingData(
        chapterJSON.Ending.title,
        chapterJSON.Ending.subText
      );
    },
    setSequencerIntroData(title, subText) {
      // Sets the Sequencer's data for Intro
      console.log(`setSequencerIntroData(
        ${title}, 
      ${subText}
      )`);
      this.Intro.title = title;
      this.Intro.subText = subText;
    },
    setSequencerTextSectionData(text) {
      // Sets the Sequencer's data for the TextSections
      console.log(`setSequencerTextSectionData(
        ${text}
        )`);
      this.TextSection.text = text;
    },
    setSequencerChoiceSectionData(
      text,
      choice1,
      choice2,
      correctChoice,
      gameOverText
    ) {
      // Sets the Sequencer's data for the ChoiceSections
      console.log(`setSequencerChoiceSectionData(
        ${text},
        ${choice1},
        ${choice2},
        ${correctChoice},
        ${gameOverText}
       )`);
      this.ChoiceSection.text = text;
      this.ChoiceSection.choices.choice1 = choice1;
      this.ChoiceSection.choices.choice2 = choice2;
      this.ChoiceSection.choicesMetadata.correctChoice = correctChoice;
      this.ChoiceSection.choicesMetadata.gameOverText = gameOverText;
    },
    setSequencerEndingData(title, subText) {
      // Sets the Sequencer's data for the Ending
      console.log(`setSequencerEndingData(
        ${title},
        ${subText},
       )`);
      this.Ending.title = title;
      this.Ending.subText = subText;
    },
    createChapterTimeline() {
      const inputJSON = JSON.parse(this.jsonPayload);
      const chapterJSON = inputJSON.MainSections[0];

      // Loop through the JSON to create our Timeline (To show and hide elements)
      var timeline = [];

      var i = 0;
      for (const section in chapterJSON) {
        console.log(i);
        if (section.includes("Intro")) {
          timeline.push([i, "Intro"]);
          console.log("Introduction: " + section);
        } else if (section.includes("TextSection")) {
          timeline.push([i, "TextSection"]);
          console.log("TextSection: " + section);
        } else if (section.includes("ChoiceSection")) {
          timeline.push([i, "ChoiceSection"]);
          console.log("ChoiceSection: " + section);
        } else if (section.includes("Ending")) {
          timeline.push([i, "Ending"]);
          console.log("Ending: " + section);
        }
        i++;
      }
      console.log(timeline);
    },
  },
  mounted() {
    // When mounted, display the first set of data.
    // Call a function with all the current state's data
    this.createChapterTimeline();
    this.setInitialComponentDataFromJsonImportProp();

    // this.$slots.chapterContent = `aaaaaaaa`;
    // this.dynamicComponentContent = `<Choice text="A hooded man is in the alleyway nearest you. You see he's stolen a woman's purse! What do you do next?" choice1="Chase Him" choice2="Run Away" correctChoice="2"/>`;
    // this.LogMyKeys();
  },
};
</script>

<style>
</style>