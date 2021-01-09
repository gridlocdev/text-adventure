<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet class="ma-2 pa-1" elevation="10" outlined rounded>
          <v-row class="mx-2 d-flex">
            <v-icon class="ma-2"> mdi-text-box-multiple </v-icon>
            <h2 class="my-4">Text Section</h2>
            <v-icon class="ml-auto">mdi-close</v-icon>
          </v-row>
          <v-divider class="mx-2"></v-divider>
          <v-row class="pa-5" v-for="textJSON in textArray" :key="textJSON.id">
            <v-text-field
              v-model="textJSON.text"
              class="pl-3 pa-2"
              label="Text"
              hide-details="auto"
            />
            <v-divider vertical></v-divider>
            <v-icon
              @click="removeExistingText(textJSON.id)"
              small
              class="px-4 ml-auto"
              >mdi-minus-circle-outline</v-icon
            >
          </v-row>
          <v-row class="mx-5 my-2" align="center" justify="center">
            <!-- <v-sheet rounded outlined elevation="5">
              <v-icon class="ma-1">mdi-plus</v-icon>
            </v-sheet> -->
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
export default {
  name: "AddTextSection",
  data() {
    return {
      currentTextIndex: 0,
      textArray: [{ id: 0, text: "" }],
    };
  },
  watch: {
    title: function () {
      console.log("Title changed to: " + this.title);
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
          console.log("iterating in array: i = " + i);
          this.textArray[i].id = i;
        }
      }
      this.currentTextIndex--;
    },
  },
};
</script>

<style scoped>
.v-icon:hover {
  opacity: 0.6;
}
.v-icon::after {
  display: none !important;
}
</style>