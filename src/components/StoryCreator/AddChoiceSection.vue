<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet class="ma-2 pa-1" elevation="10" outlined rounded>
          <v-row class="mx-2 d-flex">
            <v-icon class="ma-2"> mdi-file-tree </v-icon>
            <h2 class="my-4">ChoiceSection</h2>
            <!-- <v-btn
              tabindex="-1"
              class="my-auto ml-auto"
              icon
              depressed
              @click="removeSection()"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn> -->
          </v-row>
          <v-divider class="mx-2"></v-divider>
          <v-text-field
            v-model="questionText"
            class="pa-5"
            label="Question Text"
            hide-details="auto"
            :rules="[rules.required, rules.counters.questionText]"
          />
          <v-row class="mx-1" align="center" justify="center">
            <v-col>
              <v-row>
                <v-text-field
                  v-model="choices.choice1"
                  class="pa-5"
                  label="Answer 1"
                  hide-details="auto"
                  :rules="[rules.required, rules.counters.answerBox]"
                />
                <v-btn
                  :style="{
                    'background-color':
                      choiceButtonAppearances[0].backgroundColor,
                  }"
                  v-ripple="{
                    class: 'success--text',
                  }"
                  tabindex="-1"
                  class="my-5 answerButton"
                  fab
                  small
                  elevation="4"
                  @click="setCorrectAnswer('1')"
                  depressed
                >
                  <v-icon
                    class="choiceIcon"
                    :color="choiceButtonAppearances[0].color"
                    >mdi-{{ choiceButtonAppearances[0].icon }}</v-icon
                  >
                </v-btn>
              </v-row>
            </v-col>
            <v-col>
              <v-row>
                <v-text-field
                  v-model="choices.choice2"
                  class="pa-5"
                  label="Answer 2"
                  hide-details="auto"
                  :rules="[rules.required, rules.counters.answerBox]"
                />
                <v-btn
                  :style="{
                    'background-color':
                      choiceButtonAppearances[1].backgroundColor,
                  }"
                  v-ripple="{
                    class: 'success--text',
                  }"
                  tabindex="-1"
                  class="my-5 answerButton"
                  fab
                  small
                  elevation="4"
                  @click="setCorrectAnswer('2')"
                  depressed
                >
                  <v-icon
                    class="choiceIcon"
                    :color="choiceButtonAppearances[1].color"
                    >mdi-{{ choiceButtonAppearances[1].icon }}</v-icon
                  >
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-icon class="pl-6" color="success"> mdi-check-bold </v-icon>
            <v-text-field
              v-model="choicesMetadata.successText"
              class="pa-5"
              label="Success Message"
              hide-details="auto"
              :rules="[
                rules.required,
                rules.counters.successTextAndGameOverText,
              ]"
            />
          </v-row>
          <v-row>
            <v-icon class="pl-6" color="error">mdi-close-thick</v-icon>
            <v-text-field
              v-model="choicesMetadata.gameOverText"
              class="pa-5"
              label="Game Over Message"
              hide-details="auto"
              :rules="[
                rules.required,
                rules.counters.successTextAndGameOverText,
              ]"
            />
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AddChoiceSection",
  props: {
    sectionID: Number,
  },
  data() {
    return {
      questionText: "",
      choices: {
        choice1: "",
        choice2: "",
      },
      choicesMetadata: {
        correctChoice: "1",
        gameOverText: "",
        successText: "",
      },
      choiceButtonAppearances: [
        {
          icon: "check-bold",
          color: "success",
          backgroundColor: "rgba(0, 255, 0, 0.175)",
        },
        {
          icon: "close-thick",
          color: "error",
          backgroundColor: "rgba(255, 0, 0, 0.175)",
        },
      ],

      rules: {
        required: (value) => !!value || "Cannot be empty",
        counters: {
          questionText: (value) =>
            value.length <= 75 || "Maximum of 75 characters",
          answerBox: (value) =>
            value.length <= 50 || "Maximum of 50 characters",
          successTextAndGameOverText: (value) =>
            value.length <= 350 || "Maximum of 350 characters",
        },
      },
    };
  },
  watch: {
    questionText: {
      handler: function () {
        this.exportSectionData("ChoiceSection", {
          questionText: this.questionText,
          choices: {
            choice1: this.choices.choice1,
            choice2: this.choices.choice2,
          },
          choicesMetadata: {
            correctChoice: this.choicesMetadata.correctChoice,
            gameOverText: this.choicesMetadata.gameOverText,
            successText: this.choicesMetadata.successText,
          },
        });
      },
      deep: false,
    },
    choices: {
      handler: function () {
        this.exportSectionData("ChoiceSection", {
          questionText: this.questionText,
          choices: {
            choice1: this.choices.choice1,
            choice2: this.choices.choice2,
          },
          choicesMetadata: {
            correctChoice: this.choicesMetadata.correctChoice,
            gameOverText: this.choicesMetadata.gameOverText,
            successText: this.choicesMetadata.successText,
          },
        });
      },
      deep: true,
    },
    choicesMetadata: {
      handler: function () {
        this.exportSectionData("ChoiceSection", {
          questionText: this.questionText,
          choices: {
            choice1: this.choices.choice1,
            choice2: this.choices.choice2,
          },
          choicesMetadata: {
            correctChoice: this.choicesMetadata.correctChoice,
            gameOverText: this.choicesMetadata.gameOverText,
            successText: this.choicesMetadata.successText,
          },
        });
      },
      deep: true,
    },
  },
  methods: {
    setCorrectAnswer(answer) {
      if (this.choicesMetadata.correctChoice != answer) {
        this.choicesMetadata.correctChoice = answer;
        this.setChoiceIconAppearances(answer - 1);
      }
    },
    setChoiceIconAppearances(buttonIndex) {
      // store some temporary values to keep for when the values switch
      const tempColor = this.choiceButtonAppearances[buttonIndex].color;
      const tempIcon = this.choiceButtonAppearances[buttonIndex].icon;
      const tempBackgroundColor = this.choiceButtonAppearances[buttonIndex]
        .backgroundColor;

      switch (buttonIndex) {
        case 0:
          this.choiceButtonAppearances[0].color = this.choiceButtonAppearances[1].color;
          this.choiceButtonAppearances[0].backgroundColor = this.choiceButtonAppearances[1].backgroundColor;
          this.choiceButtonAppearances[0].icon = this.choiceButtonAppearances[1].icon;

          this.choiceButtonAppearances[1].color = tempColor;
          this.choiceButtonAppearances[1].backgroundColor = tempBackgroundColor;
          this.choiceButtonAppearances[1].icon = tempIcon;

          break;
        case 1:
          this.choiceButtonAppearances[1].color = this.choiceButtonAppearances[0].color;
          this.choiceButtonAppearances[1].backgroundColor = this.choiceButtonAppearances[0].backgroundColor;
          this.choiceButtonAppearances[1].icon = this.choiceButtonAppearances[0].icon;

          this.choiceButtonAppearances[0].color = tempColor;
          this.choiceButtonAppearances[0].backgroundColor = tempBackgroundColor;
          this.choiceButtonAppearances[0].icon = tempIcon;
          break;
      }
    },
    exportSectionData(sectionType, sectionData) {
      this.$emit("sectionModified", this.sectionID);
      this.$emit("updateComponentData", JSON.stringify(sectionData));
    },
  },
};
</script>

<style scoped>
.v-btn.answerButton {
  color: green;
}
.v-btn.answerButton:not(:focus):hover {
  color: red;
}
.v-btn.answerButton:focus {
  outline: none;
}
</style>