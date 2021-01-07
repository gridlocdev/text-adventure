<template>
  <v-container>
    <v-row cols="12">
      <v-col class="col-6" align="center" justify="center">
        <i>insert nested draggables here</i>
        <draggable
          class="dragArea list-group"
          :list="newStorySections"
          group="SectionList"
          @change="log"
        >
        <div v-for="element in newStorySections" :key="element.text">
          {{ element.text }}
        </div>
        </draggable>
      </v-col>
      <v-col class="col-6" align="center" justify="center">
        <draggable
          class="dragArea list-group"
          :list="itemList"
          :group="{ name: 'SectionList', pull: 'clone', put: false }"
          @change="log"
        >
          <div v-for="element in itemList" :key="element.text">
            <v-btn block :ripple="false" depressed class="ma-1 pa-3">
              <v-icon class="pr-2">
                {{ element.icon }}
              </v-icon>
              {{ element.text }}
            </v-btn>
          </div>
        </draggable>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  data: function () {
    return {
      newStorySections: [],
      itemList: [
        {
          text: "Add Chapter",
          icon: "mdi-folder-plus",
          type: "goodbye",
        },
        {
          text: "Intro",
          icon: "mdi-rocket-launch",
          type: "greeting",
        },
        {
          text: "Text Section",
          icon: "mdi-text-box-multiple",
          type: "greeting",
        },
        {
          text: "Choice Section",
          icon: "mdi-file-tree",
          type: "affirmation",
        },
        {
          text: "Ending",
          icon: "mdi-marker-check",
          type: "goodbye",
        },
      ],
    };
  },
  methods: {
    log(event) {
      window.console.log(event);
      console.log(JSON.parse(JSON.stringify(this.newStorySections)));
    },
  },
};
</script>

<style>
</style>