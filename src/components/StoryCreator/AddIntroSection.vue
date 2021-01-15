<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet class="ma-2 pa-1" elevation="10" outlined rounded>
          <v-row class="mx-2 d-flex">
            <v-icon class="ma-2"> mdi-rocket-launch </v-icon>
            <h2 class="my-4">Intro</h2>
            <v-btn
              tabindex="-1"
              class="my-auto ml-auto"
              icon
              depressed
              @click="removeSection()"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-row>
          <v-divider class="mx-2"></v-divider>
          <v-text-field
            :rules="[rules.required, rules.counter]"
            v-model="title"
            class="pa-5"
            label="Intro Title"
            hide-details="auto"
          />
          <v-text-field
            :rules="[rules.required, rules.counter]"
            v-model="subText"
            class="pa-5"
            label="Intro Subtitle"
            hide-details="auto"
          />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AddIntro",
  props: {
    sectionID: Number,
  },
  data() {
    return {
      title: "",
      subText: "",
      rules: {
        required: (value) => !!value || "Cannot be empty",
        counter: (value) => value.length <= 50 || "Maximum of 50 characters",
      },
    };
  },
  watch: {
    title: function () {
      this.exportSectionData("Intro", {
        title: this.title,
        subText: this.subText,
      });
    },
    subText: function () {
      this.exportSectionData("Intro", {
        title: this.title,
        subText: this.subText,
      });
    },
  },
  methods: {
    exportSectionData(sectionType, sectionData) {
      this.$emit("sectionModified", this.sectionID);
      this.$emit("updateComponentData", JSON.stringify(sectionData));
    },
  },
};
</script>

<style scoped>
</style>