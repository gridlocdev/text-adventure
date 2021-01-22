<template>
  <v-container
    id="fadeContainer"
    class="animate__animated animate__fadeIn"
    style="--animate-duration: 2s"
  >
    <v-row>
      <v-col align="center" justify="center">
        <v-row style="width: 70%">
          <v-col :key="item.id" v-for="item in chapterIconMasterList">
            <v-btn
              :ripple="false"
              :key="item.id"
              :color="item.color"
              v-bind="btnProps"
              depressed
              elevation="2"
              fab
              tile
            >
              <v-icon> mdi-{{ item.name }} </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-col>
      <v-row class="ma-1" align="center" justify="center">
        <h1>{{ title }}</h1>
      </v-row>

      <v-row align="center" justify="center">
        {{ subText }}
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "Ending",
  props: {
    title: String,
    subText: String,
  },
  data() {
    return {
      chapterIconMasterList: [
        // {
        //   name: "",
        //   color: "",
        // },
      ],
    };
  },
  computed: {
    btnProps() {
      // This function adds a prop to all the buttons to resize based on viewport width.
      let props = {};
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          props["md"] = true;
          break;
        case "sm":
          props["large"] = true;
          break;
        case "md":
          props["x-large"] = true;
          break;
        case "lg":
          props["x-large"] = true;
          break;
        case "xl":
          props["x-large"] = true;
          break;
        default:
      }
      return props;
    },
  },
  methods: {
    startFadeInOutAnimation() {
      // Fade in to show the text, wait a bit, then fade out.
      // Wait the 5500ms for fadeIn, then fadeOut.
      var fadeContainer = document.getElementById("fadeContainer");
      // setEndingButtonGlow also has a set timeout, executing asynchronously.
      this.setEndingButtonGlow();
      setTimeout(() => {
        // Checking if exists to avoid navigation error.
        if (document.body.contains(fadeContainer)) {
          fadeContainer.classList.replace(
            "animate__fadeIn",
            "animate__fadeOut"
          );
          // Wait for the 3000ms for fadeOut to end, and emit an event.
          setTimeout(() => {
            this.$emit("endChapter");
          }, 3000);
        }
      }, 4000);
    },
    setEndingButtonGlow() {
      // After a set time, light up the most recent chapter's icon
      setTimeout(() => {
        this.chapterIconMasterList[this.$store.state.CurrentChapter - 1].color =
          "primary";
      }, 1500);
    },
    importIconListFromState() {
      // From the app state's list of icons, populate the icons and also set which ones to light up at the start.

      const storyJSON = JSON.parse(this.$store.state.CurrentStoryJSON);

      // Set the Ending Component's data to include the icon names, and whether they should light up yet
      for (var i = 0; i < storyJSON.Chapters.length; i++) {
        if (i < this.$store.state.CurrentChapter - 1) {
          // If the chapter has been played, Sets the color to "Primary" for that button.

          this.chapterIconMasterList.push({
            name: storyJSON.Chapters[i].ChapterIcon,
            color: "primary",
          });
        } else {
          // If the chapter has not been played, sets no color for that button.
          this.chapterIconMasterList.push({
            name: storyJSON.Chapters[i].ChapterIcon,
            color: "",
          });
        }
      }
    },
  },
  mounted() {
    this.importIconListFromState();

    // If the component gets mounted but was inactive before mount
    if (this._inactive != true) {
      this.startFadeInOutAnimation();
    }
  },
  activated() {
    // Updates the Navigation bar's text header
    this.$store.dispatch("setPageIndex", this.$options.name);

    this.startFadeInOutAnimation();
  },
};
</script>

<style scoped>
.v-btn {
  /* Button Color Change: animate fade takes 400ms  */
  transition: background-color 400ms linear;
}
</style>