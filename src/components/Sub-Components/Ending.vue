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
              :key="item.id"
              :color="item.color"
              v-bind="btnProps"
              depressed
              elevation="2"
              fab
              tile
            >
              <v-icon>
                {{ item.name }}
              </v-icon>
            </v-btn>
          </v-col>

          <!-- <v-col
            style="--animate-duration: 1.75s"
            class="animate__animated animate__infinite animate__pulse"
            ><v-btn depressed elevation="2" fab tile
              ><v-icon>mdi-crown-outline</v-icon></v-btn
            ></v-col
          >
          <v-col
            ><v-btn depressed elevation="2" fab tile color="success"
              ><v-icon>mdi-bridge</v-icon></v-btn
            ></v-col
          >
          <v-col
            ><v-btn depressed elevation="2" fab tile
              ><v-icon>mdi-sword-cross</v-icon></v-btn
            ></v-col
          >
          <v-col
            ><v-btn depressed elevation="2" fab tile
              ><v-icon>mdi-wizard-hat</v-icon></v-btn
            ></v-col
          >
          <v-col
            ><v-btn depressed elevation="2" fab tile
              ><v-icon>mdi-image-filter-hdr</v-icon></v-btn
            ></v-col
          > -->
        </v-row>
      </v-col>
    </v-row>
    <v-col>
      <v-row align="center" justify="center">
        <h1>{{ Header }}</h1>
      </v-row>

      <v-row align="center" justify="center">
        {{ SubText }}
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "Ending",
  props: {
    Header: String,
    SubText: String,
  },
  data: function () {
    return {
      chapterIconMasterList: [
        // {
        //   name: "",
        //   color: "",
        // },
      ],
      predefinedBtnProps: {
        xs: {
          color: "green",
          "x-small": true,
        },
        sm: {
          color: "blue",
          small: true,
        },
        md: {
          color: "yellow",
        },
        lg: {
          color: "red",
          large: true,
        },
        xl: {
          color: "purple",
          "x-large": true,
        },
      },
    };
  },
  computed: {
    btnProps() {
      //console.log(this.$vuetify.breakpoint.name);
      let props = {};
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          //props.color = "green";
          props["md"] = true;
          break;
        case "sm":
          //props.color = "blue";
          props["large"] = true;
          break;
        case "md":
          //props.color = "yellow";
          props["x-large"] = true;
          break;
        case "lg":
          //props.color = "green";
          props["x-large"] = true;
          break;
        case "xl":
          //props.color = "purple";
          props["x-large"] = true;
          break;
        default:
        //props.color = "red";
      }
      return props;
    },
  },
  methods: {
    startFadeInOutAnimation() {
      // Function to handle fading in/out Ending text on a timer.
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
      }, 5500);
    },
    setEndingButtonGlow() {
      setTimeout(() => {
        // After a set time, light up the most recent chapter's icon
        this.chapterIconMasterList[this.$store.state.CurrentChapter - 1].color =
          "primary";
      }, 1500);
    },
    importIconListFromState() {
      // For the chapter state, populate the icons and also set which ones to light up by default.

      // Set the Ending Component's data to include the icon names, and whether they should light up yet
      for (var i = 0; i < this.$store.state.NumberOfChapters; i++) {
        if (i < this.$store.state.CurrentChapter - 1) {
          // If the chapter has been played, Sets the color to "Primary" for that button.
          this.chapterIconMasterList.push({
            name: this.$store.state.ChapterIconList[i],
            color: "primary",
          });
          console.log("true" + i);
        } else {
          // If the chapter has not been played, sets no color for that button.
          this.chapterIconMasterList.push({
            name: this.$store.state.ChapterIconList[i],
            color: "",
          });
        }
      }
    },
  },
  errorCaptured(error) {
    console.log(
      "haha. I've caught the error, but done nothing about it.",
      error
    );
  },
  mounted() {
    // Sets the list of icons on this component to an array stored in the Application store.
    this.importIconListFromState();

    // Updates the Page Index
    this.$store.dispatch("setPageIndex", this.$options.name);

    // Triggers the animation to fade page in and out
    // Also triggers coloring the newly completed chapter button.
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