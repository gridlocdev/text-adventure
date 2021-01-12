<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet class="ma-2 pa-1" elevation="10" outlined rounded>
          <v-row class="mx-2 d-flex">
            <v-icon class="ma-2"> mdi-rocket-launch </v-icon>
            <h2 class="my-4">Intro</h2>
            <v-icon class="ml-auto clickable">mdi-close</v-icon>
          </v-row>
          <v-divider class="mx-2"></v-divider>
          <v-text-field
            v-model="title"
            class="pa-5"
            label="Intro Title"
            hide-details="auto"
          />
          <v-text-field
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
      this.$emit(
        "updateComponentData",
        JSON.stringify({
          SectionType: sectionType,
          SectionData: sectionData,
        })
      );
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