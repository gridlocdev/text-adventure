<template>
  <v-container
    class="animate__animated animate__fadeIn"
    style="animation-duration: 0.25s"
  >
    <v-row class="ma-5">
      <v-col align="center" justify="center">
        <v-row class="pb-5">
          <v-col align="center" justify="center">
            <h1>Import a Story</h1>
          </v-col>
        </v-row>
        <import-file
          ref="importFile"
          @fileImported="fileImported"
          @fileRemoved="fileRemoved"
          @fileValidationError="fileValidationError"
          @fileValidationSuccess="fileValidationSuccess"
          @fileValidationDuplicate="fileValidationDuplicate"
        ></import-file>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="my-5 mx-10">
      <v-col align="center" justify="center">
        <v-btn
          fixed
          bottom
          class="mb-5"
          :style="{ left: '50%', transform: 'translateX(-50%)' }"
          color="primary"
          x-large
          :disabled="addStoryButtonDisabled"
          @click="validateImportedJSON()"
          elevation="10"
        >
          <span><strong> Add Story to Browser Cache </strong></span></v-btn
        >
      </v-col>
    </v-row>
    <div class="text-center">
      <v-dialog v-model="modals.successDialog" width="500">
        <v-card>
          <v-card-title class="headline">
            <v-row>
              <v-col align="center" justify="center">
                <h2>Success!</h2>
              </v-col>
            </v-row>
          </v-card-title>

          <v-row no-gutters>
            <v-icon
              class="mx-auto"
              style="font-size: 6em"
              x-large
              color="green"
            >
              mdi-check-circle-outline
            </v-icon>
          </v-row>

          <v-row no-gutters>
            <v-col align="center" justify="center">
              <v-card-text>
                Your story was saved successfully.
                <v-spacer></v-spacer>
                To play this story, navigate to the Story Library and click
                "Play"!</v-card-text
              >
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              align="left"
              color="primary"
              text
              @click="modals.successDialog = false"
            >
              Close
            </v-btn>
            <v-btn color="primary" text @click="routerPushToStoryLibrary()">
              Story Library
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="modals.duplicateDialog" width="500">
        <v-card>
          <v-card-title class="headline">
            <v-row>
              <v-col align="center" justify="center">
                <h4>Looks like this story exists already.</h4>
              </v-col>
            </v-row>
          </v-card-title>

          <v-row class="px-15" no-gutters>
            <v-col align="center" justify="center">
              <v-icon
                class="mx-5"
                style="font-size: 6em"
                x-large
                color="primary"
              >
                mdi-book-cancel-outline
              </v-icon>
              <v-icon
                class="mx-5"
                style="font-size: 6em"
                x-large
                color="primary"
              >
                mdi-book-cancel-outline
              </v-icon>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col align="center" justify="center">
              <v-card-text>
                Your story
                <strong>{{ modals.duplicateStoryName }}</strong> already exists
                in your browser's local cache, so it wouldn't really make sense
                to put it there twice.
              </v-card-text>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              align="left"
              color="primary"
              text
              @click="modals.duplicateDialog = false"
            >
              Close
            </v-btn>
            <v-btn color="primary" text @click="routerPushToStoryLibrary()">
              Story Library
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar centered v-model="modals.errorSnackbar.enabled">
        {{ modals.errorSnackbar.text }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="modals.errorSnackbar.enabled = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
import ImportFile from "../components/StoryCreator/ImportFile.vue";
export default {
  components: { ImportFile },
  data: function () {
    return {
      addStoryButtonDisabled: true,
      modals: {
        successDialog: false,
        duplicateDialog: false,
        duplicateStoryName: "",
        errorSnackbar: {
          enabled: false,
          text:
            "The imported file is missing something, check the JSON for any empty values and modify those in an external text editor!",
        },
      },
    };
  },
  methods: {
    fileValidationDuplicate(storyName) {
      this.modals.duplicateStoryName = storyName;
      this.addStoryButtonDisabled = true;
      this.modals.duplicateDialog = true;
    },
    fileValidationSuccess() {
      this.addStoryButtonDisabled = true;
      this.modals.successDialog = true;
    },
    fileValidationError() {
      this.addStoryButtonDisabled = true;
      this.modals.errorSnackbar.enabled = true;
    },
    validateImportedJSON() {
      this.$refs.importFile.validateImportedJSON();
    },
    fileImported(fileText) {
      this.addStoryButtonDisabled = false;
      console.log(JSON.stringify(fileText, null, 2));
    },
    fileRemoved() {
      this.addStoryButtonDisabled = true;
    },
    createStory() {
      this.addStoryButtonDisabled = true;
      this.modals.successDialog = true;
      this.$refs.importFile.createStory();
    },
    routerPushToStoryLibrary: function () {
      this.$router.push({ name: "StoryLibrary" });
    },
  },
};
</script>

<style>
</style>