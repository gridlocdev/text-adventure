<template>
  <div>
    <v-btn icon @click="settingsModal = true">
      <v-icon>mdi-cog</v-icon>
    </v-btn>

    <v-dialog v-model="settingsModal" max-width="500px">
      <v-card>
        <v-card-title class="text-center">
          <v-icon> mdi-cog </v-icon>
          <span class="text-center" style="margin-left: 10px"> Settings </span>
        </v-card-title>
        <v-divider></v-divider>
        <div>
          <v-row
            v-for="item in SettingsItems_Toggles"
            :key="item.title"
            name="toggleRows"
            align="center"
            justify="center"
            class="text-center my-3"
            cols="12"
            no-gutters
          >
            <v-col class="col-5">
              <h4 class="font-weight-medium">
                {{ item.title }}
              </h4>
            </v-col>
            <v-col>
              <v-btn
                class="ma-2 myClass"
                fab
                @click="triggerMethodFromMethodName(item.methodName)"
              >
                <!-- item.toggle = !item.toggle; -->
                <v-icon>mdi-{{ item.icon }}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <div>
          <v-row
            v-for="item in SettingsItems_ChoiceBtns"
            :key="item.title"
            name="multiButtonRows"
            align="center"
            justify="center"
            class="text-center my-3"
            cols="12"
            no-gutters
          >
            <v-col class="col-5">
              <h4 class="font-weight-medium">
                {{ item.title }}
              </h4>
            </v-col>
            <v-col>
              <v-btn-toggle
                v-model="item.activeBtnPosition"
                mandatory
                tile
                color="accent-3"
                group
              >
                <v-btn @click="setTextSpeed(50)" value="left"> Slow </v-btn>

                <v-btn @click="setTextSpeed(30)" value="center"> Normal </v-btn>

                <v-btn @click="setTextSpeed(10)" value="right"> Fast </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
        </div>
        <div>
          <reset-story-progress
            v-on:closeSettingsModal="settingsModal = false"
          />
        </div>

        <v-card-actions>
          <v-btn color="primary" text @click="settingsModal = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ResetStoryProgress from "./ResetStoryProgress.vue";

export default {
  name: "Settings",
  components: {
    ResetStoryProgress,
  },
  data() {
    return {
      settingsModal: false,
      SettingsItems_Toggles: [
        {
          title: "Dark Mode",
          icon: "",
          methodName: "toggleDarkMode",
          toggle: this.$store.state.DarkMode,
        },
      ],
      SettingsItems_ChoiceBtns: [
        {
          title: "Text Speed",
          methodName: "setTextSpeed",
          textSpeed: "Normal",
          activeBtnPosition: "center",
        },
      ],
    };
  },

  methods: {
    triggerMethodFromMethodName(methodName) {
      // Is used to handle method names defined in the data
      // In retrospect, this probably could have been done using watchers and a switch statement. 
      this[methodName]();
    },
    setPageIndex() {
      // Updates the Navigation bar's text header
      this.$store.dispatch("setPageIndex", this.$options.name);
    },
    toggleDarkMode() {
      // Toggles Vuetify's dark mode setting.

      // Set the ViewModel as the data we need
      var vm = this.SettingsItems_Toggles[0];
      vm.toggle = !vm.toggle;

      this.$vuetify.theme.dark = vm.toggle;
      // Set the Icon of the ViewModel based on the Toggle value

      switch (vm.toggle) {
        case true:
          vm.icon = "weather-night";
          break;
        case false:
          vm.icon = "white-balance-sunny";
          break;
      }
      // Update our AppState by calling the Action
      this.$store.dispatch("toggleDarkMode", vm.toggle);
    },
    setDarkModeSettingsIcon(toggle) {
      // Switches the icon once the dark mode button is clicked.
      switch (toggle) {
        case true:
          this.SettingsItems_Toggles[0].icon = "weather-night";
          break;
        case false:
          this.SettingsItems_Toggles[0].icon = "white-balance-sunny";
          break;
      }
      this.SettingsItems_Toggles[0].toggle = toggle;
    },
    setTextSpeedButtonGroupActiveItem(textSpeed) {
      // Sets the speed that text types in the stories.
      switch (textSpeed) {
        case 50:
          this.SettingsItems_ChoiceBtns[0].activeBtnPosition = "left";
          break;
        case 30:
          this.SettingsItems_ChoiceBtns[0].activeBtnPosition = "center";
          break;
        case 10:
          this.SettingsItems_ChoiceBtns[0].activeBtnPosition = "right";
          break;
        default:
          break;
      }
    },
    setTextSpeed(textSpeed) {
      this.$store.dispatch("setTextSpeed", textSpeed);
    },
  },
  watch: {
    settingsModal: function () {
      // When the SettingsModal is opened, call SetPageIndex()
      this.setPageIndex();
    },
  },
  mounted() {
    this.setDarkModeSettingsIcon(this.$store.state.DarkMode);
    this.setTextSpeedButtonGroupActiveItem(this.$store.state.TextSpeed);
  },
};
</script>

<style scoped >
.myClass:focus::before {
  opacity: 0 !important;
}

.v-card.v-sheet.theme--light {
  background-color: #f4f4f4 !important;
}
</style>