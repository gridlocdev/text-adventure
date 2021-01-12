<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet class="ma-2 pa-1" elevation="10" outlined rounded>
          <v-row class="mx-2 d-flex">
            <v-icon class="ma-2"> mdi-text-box-multiple </v-icon>
            <h2 class="my-4">Text Section</h2>
            <v-icon class="ml-auto clickable">mdi-close</v-icon>
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
                <v-icon
                  tabindex="-1"
                  @click="moveTextSection(textJSON.id, 'up')"
                  class="ma-2 clickable"
                  >mdi-chevron-up</v-icon
                >
              </v-row>
              <v-row
                class="hidden-sm-and-up py-1 py-xs-0"
                align="center"
                justify="center"
              >
                <v-icon
                  tabindex="-1"
                  @click="removeExistingText(textJSON.id)"
                  class="ma-2 clickable"
                  >mdi-delete-forever</v-icon
                >
              </v-row>
              <v-row
                v-if="textJSON.id != textArray.length - 1"
                class="py-1 py-xs-0"
                align="center"
                justify="center"
              >
                <v-icon
                  tabindex="-1"
                  @click="moveTextSection(textJSON.id, 'down')"
                  class="ma-2 clickable"
                  >mdi-chevron-down</v-icon
                >
              </v-row>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="10">
              <v-textarea
                rows="1"
                auto-grow
                class="px-2"
                counter
                label="Text"
                v-model="textJSON.text"
                :rules="textAreaMetadata.rules"
                :value="textAreaMetadata.value"
              ></v-textarea>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="hidden-xs-only my-auto" col="1">
              <v-row justify="center">
                <v-icon
                  tabindex="-1"
                  @click="removeExistingText(textJSON.id)"
                  class="ma-2 clickable"
                  >mdi-delete-forever</v-icon
                >
              </v-row>
            </v-col>
          </v-row>
          <v-row class="mx-5 my-2" align="center" justify="center">
            <v-btn @click="addNewText()" class="pa-5" block>
              <v-icon class="ma-1 clickable">mdi-plus</v-icon>
            </v-btn>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AddTextSection",
  props: {
    sectionID: Number,
  },
  data() {
    return {
      currentTextIndex: 0,
      textArray: [{ id: 0, text: "" }],
      textAreaMetadata: {
        rules: [(v) => v.length <= 350 || "Max 350 characters"],
        value: "Hello!",
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
      this.currentTextIndex = this.textArray.length;
      this.textArray.push({ id: this.currentTextIndex, text: "" });
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
.v-icon.clickable:hover {
  opacity: 0.6;
  cursor: pointer;
}
.v-icon.clickable::after {
  display: none !important;
}
</style>