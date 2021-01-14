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
                mdi-{{ element.icon }}
              </v-icon>
              mdi-{{ element.text }}
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
          icon: "folder-plus",
          componentName: 'Chapter',
        },
        {
          text: "Intro",
          icon: "rocket-launch",
          componentName: 'Intro'
        },
        {
          text: "Text Section",
          icon: "text-box-multiple",
          componentName: 'Text Section'
        },
        {
          text: "Choice Section",
          icon: "file-tree",
          componentName: 'Choice Section'
        },
        {
          text: "Ending",
          icon: "marker-check",
          componentName: 'Ending'
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