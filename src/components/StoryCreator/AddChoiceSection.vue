<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet class="ma-2 pa-1" elevation="10" outlined rounded>
          <v-row class="mx-2 d-flex">
            <v-icon class="ma-2"> mdi-file-tree </v-icon>
            <h2 class="my-4">ChoiceSection</h2>
            <v-icon class="ml-auto">mdi-close</v-icon>
          </v-row>
          <v-divider class="mx-2"></v-divider>
          <v-text-field
            v-model="questionText"
            class="pa-5"
            label="Question Text"
            hide-details="auto"
          />
          <v-row class="mx-1" align="center" justify="center">
            <v-col>
              <v-row>
                <v-text-field
                  v-model="choices.choice1"
                  class="pa-5"
                  label="Answer 1"
                  hide-details="auto"
                />
                <v-btn
                  :style="{
                    'background-color':
                      choiceButtonAppearances[0].backgroundColor,
                  }"
                  v-ripple="{
                    class: 'success--text',
                  }"
                  class="my-5"
                  fab
                  small
                  elevation="4"
                  @click="setCorrectAnswer('1')"
                  depressed
                >
                  <v-icon
                    class="choiceIcon"
                    :color="choiceButtonAppearances[0].color"
                    >{{ choiceButtonAppearances[0].icon }}</v-icon
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
                />
                <v-btn
                  :style="{
                    'background-color':
                      choiceButtonAppearances[1].backgroundColor,
                  }"
                  v-ripple="{
                    class: 'success--text',
                  }"
                  class="my-5"
                  fab
                  small
                  elevation="4"
                  @click="setCorrectAnswer('2')"
                  depressed
                >
                  <v-icon
                    class="choiceIcon"
                    :color="choiceButtonAppearances[1].color"
                    >{{ choiceButtonAppearances[1].icon }}</v-icon
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
            />
          </v-row>
          <v-row>
            <v-icon class="pl-6" color="error">mdi-close-thick</v-icon>
            <v-text-field
              v-model="choicesMetadata.gameOverText"
              class="pa-5"
              label="Game Over Message"
              hide-details="auto"
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
          icon: "mdi-check-bold",
          color: "success",
          backgroundColor: "rgba(0, 255, 0, 0.1)",
        },
        {
          icon: "mdi-close-thick",
          color: "error",
          backgroundColor: "rgba(255, 0, 0, 0.1)",
        },
      ],
    };
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
  },
};
</script>

<style scoped>
.v-btn::before {
  background-color: transparent;
}
</style>