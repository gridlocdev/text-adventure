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
      storyJSONExport: this.storyJSON,
      snackbar: false,
      snackbarText: `Copied Story to Clipboard!`,
      snackbarTimeout: 2000,
    };
  },
  methods: {
    copyToClipboard: async function () {
      this.snackbar = true;

      const textToCopy = JSON.stringify(this.storyJSONExport);

      try {
        // 1) Copy text
        await navigator.clipboard.writeText(textToCopy);

        // 2) Catch errors
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    },
    saveFile: function () {
      const data = JSON.stringify(this.storyJSONExport);
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