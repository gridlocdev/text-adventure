<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet class="ma-2 pa-1" elevation="10" outlined rounded>
          <v-row class="mx-2 d-flex">
            <v-icon class="ma-2"> mdi-rocket-launch </v-icon>
            <h2 class="my-4">Intro</h2>
            <v-icon class="ml-auto">mdi-close</v-icon>
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
  data() {
    return {
      title: "",
      subText: "",
    };
  },
  watch: {
    title: function () {
      console.log("Title changed to: " + this.title);
    },
  },
};
</script>

<style>
</style>