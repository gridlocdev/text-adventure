<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet class="ma-2 pa-1" elevation="10" outlined rounded>
          <v-row class="mx-2 d-flex">
            <v-icon class="ma-2"> mdi-text-box-multiple </v-icon>
            <h2 class="my-4">Text Section</h2>
          </v-row>
          <v-divider class="mx-2"></v-divider>
          <v-row
            class="mx-3 my-4"
            cols="12"
            v-for="textJSON in textArray"
            :key="textJSON.id"
          >
            <v-col class="my-auto" align="center" justify="center" col="1">
              <v-row
                v-if="textJSON.id != 0"
                class="py-1 py-xs-0"
                align="center"
                justify="center"
              >
                <v-btn
                  tabindex="-1"
                  class="my-auto mx-auto"
                  icon
                  depressed
                  @click="moveTextSection(textJSON.id, 'up')"
                >
                  <v-icon>mdi-chevron-up</v-icon>
                </v-btn>
              </v-row>
              <v-row
                class="hidden-sm-and-up py-1 py-xs-0"
                align="center"
                justify="center"
              >
                <v-btn
                  tabindex="-1"
                  class="my-auto mx-auto"
                  icon
                  depressed
                  @click="removeExistingText(textJSON.id)"
                >
                  <v-icon>mdi-delete-forever</v-icon>
                </v-btn>
              </v-row>
              <v-row
                v-if="textJSON.id != textArray.length - 1"
                class="py-1 py-xs-0"
                align="center"
                justify="center"
              >
                <v-btn
                  tabindex="-1"
                  class="my-auto mx-auto"
                  icon
                  depressed
                  @click="moveTextSection(textJSON.id, 'down')"
                >
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </v-row>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="10">
              <v-textarea
                ref="textInputs"
                rows="1"
                auto-grow
                class="px-2"
                counter
                label="Text"
                v-model="textJSON.text"
                :rules="[rules.required, rules.counter]"
              ></v-textarea>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="hidden-xs-only my-auto" col="1">
              <v-row justify="center">
                <v-btn
                  tabindex="-1"
                  class="my-auto mx-auto"
                  icon
                  depressed
                  @click="removeExistingText(textJSON.id)"
                >
                  <v-icon>mdi-delete-forever</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="mx-5 my-2" align="center" justify="center">
            <v-btn @click="addNewText()" class="pa-5" block>
              <v-icon class="ma-1">mdi-plus</v-icon>
            </v-btn>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Component Description:
// This is a Section component inside the CreateStory page.
// This creates a section containing the Text Section data in the creation of a story chapter.
 
export default {
  name: "AddTextSection",
  props: {
    sectionID: Number,
  },
  data() {
    return {
      currentTextIndex: 0,
      textArray: [{ id: 0, text: "" }],
      rules: {
        required: (value) => !!value || "Cannot be empty",
        counter: (value) => value.length <= 350 || "Maximum of 350 characters",
      },
    };
  },
  watch: {
    textArray: {
      handler: function (textArray) {
        const newArray = textArray.map(({ text }) => ({ text }));
        this.exportSectionData("TextSection", newArray);
      },
      deep: true,
    },
  },

  methods: {
    addNewText() {
      // Add a new textbox to the TextSection, and have the window focus on it.
      this.currentTextIndex = this.textArray.length;
      this.textArray.push({ id: this.currentTextIndex, text: "" });
      this.$nextTick(() => {
        const lastIdx = this.textArray.length - 1;
        this.$refs.textInputs[lastIdx].focus();
      });
    },
    removeExistingText(id) {
      // Remove the element in that id's index
      this.textArray.splice(id, 1);

      // Reorder the IDs to be in a sequence again, unless removing the last in the list.
      if (id != this.textArray.length) {
        for (var i = 0; i < this.textArray.length; i++) {
          this.textArray[i].id = i;
        }
      }
      this.currentTextIndex--;
    },
    moveTextSection(id, direction) {
      // Move the element in that id's index
      switch (direction) {
        case "down":
          this.arrayMove(this.textArray, id, id + 1);
          break;
        case "up":
          this.arrayMove(this.textArray, id, id - 1);
          break;
      }

      // Reorder the IDs to be in a sequence again, unless removing the last in the list.
      if (id != this.textArray.length) {
        for (var i = 0; i < this.textArray.length; i++) {
          console.log("iterating in array: i = " + i);
          this.textArray[i].id = i;
        }
      }
      this.currentTextIndex--;
    },
    arrayMove(array, fromIndex, toIndex) {
      var element = array[fromIndex];
      array.splice(fromIndex, 1);
      array.splice(toIndex, 0, element);
    },
    exportSectionData(sectionType, sectionData) {
      this.$emit("sectionModified", this.sectionID);
      this.$emit("updateComponentData", JSON.stringify(sectionData));
    },
  },
};
</script>

<style scoped>
</style>