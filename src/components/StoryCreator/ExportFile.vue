<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-btn @click="saveFile()" class="mx-3" outlined> Save </v-btn>
      <v-btn @click="copyToClipboard()" class="mx-3" outlined> Copy </v-btn>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet class="ma-5 pa-5" elevation="10" outlined rounded>
          <v-row>
            <v-col class="text-left">
              <pre><code>{{ JSON.parse(storyJSON, null, "\t") }}</code></pre>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-snackbar v-model="snackbar" :timeout="snackbarTimeout">
        {{ snackbarText }}

        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <v-divider></v-divider>
      <v-row class="my-5 mx-10">
        <v-col align="center" justify="center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">
                <v-btn
                  fixed
                  bottom
                  class="mb-5"
                  :style="{ left: '50%', transform: 'translateX(-50%)' }"
                  color="primary"
                  x-large
                  :disabled="addStoryButtonDisabled"
                  @click="createStory()"
                  elevation="10"
                >
                  <span
                    ><strong> Add Story to Browser Cache </strong></span
                  ></v-btn
                >
              </span>
            </template>
            <span
              >Adds the story to your browser's local cache so that you can play
              it!</span
            >
          </v-tooltip>
        </v-col>
      </v-row>
    </div>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
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
            <v-btn align="left" color="primary" text @click="closeDialog()">
              Close
            </v-btn>
            <v-btn color="primary" text @click="routerPushToStoryLibrary()">
              Story Library
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "ExportFile",
  props: {
    storyJSON: String,
  },
  data() {
    return {
      snackbar: false,
      snackbarText: `Copied Story to Clipboard!`,
      snackbarTimeout: 2000,
      dialog: false,
      addStoryButtonDisabled: false,
    };
  },
  methods: {
    closeDialog() {
      this.$emit("returnToStartingTab");
      this.dialog = false;
    },
    copyToClipboard: async function () {
      this.snackbar = true;

      const textToCopy = JSON.stringify(this.storyJSON);

      try {
        // 1) Copy text
        await navigator.clipboard.writeText(textToCopy);

        // 2) Catch errors
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    },
    saveFile: function () {
      const data = JSON.stringify(this.storyJSON);
      const blob = new Blob([data], { type: "text/plain" });
      const e = document.createEvent("MouseEvents"),
        a = document.createElement("a");
      a.download = "My_Story.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
      e.initEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
    },
    createStory: function () {
      this.dialog = true;
      this.addStoryButtonDisabled = true;
      this.$emit("createStory");
    },
    routerPushToStoryLibrary: function () {
      this.$router.push({ name: "StoryLibrary" });
    },
  },
};
</script>

<style scoped>
pre {
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: inherit;
}
.v-application code {
  background-color: transparent !important;
}
</style>