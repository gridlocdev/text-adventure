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
            class="text-center"
            cols="12"
            no-gutters
          >
            <v-col class="col-5">
              <h5 class="font-weight-medium">
                {{ item.title }}
              </h5>
            </v-col>
            <v-col>
              <v-btn
                class="ma-2 myClass"
                color="grey lighten-3"
                fab
                @click="triggerMethodFromMethodName(item.methodName)"
              >
                <!-- item.toggle = !item.toggle; -->
                <v-icon>{{ item.icon }}</v-icon>
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
            class="text-center"
            cols="12"
            no-gutters
          >
            <v-col class="col-5">
              <h5 class="font-weight-medium">
                {{ item.title }}
              </h5>
            </v-col>
            <v-col>
              <v-btn-toggle v-model="item.activeBtnPosition" mandatory tile color="accent-3" group>
                <v-btn @click="SetTextSpeed('Slow')" value="left"> Slow </v-btn>

                <v-btn @click="SetTextSpeed('Normal')" value="center"> Normal </v-btn>

                <v-btn @click="SetTextSpeed('Fast')" value="right"> Fast </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
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
export default {
  name: "Settings",
  data: function () {
    return {
      settingsModal: false,
      SettingsItems_Toggles: [
        {
          title: "Sound",
          icon: "mdi-volume-off",
          methodName: "ToggleSound",
          toggle: false,
        },
        {
          title: "Dark Mode",
          icon: "mdi-weather-night",
          methodName: "ToggleDarkMode",
          toggle: false,
        },
      ],
      SettingsItems_ChoiceBtns: [
        {
          title: "Text Speed",
          methodName: "SetTextSpeed",
          textSpeed: "Normal",
          activeBtnPosition: 'center'
        },
      ],
    };
  },

  methods: {
    triggerMethodFromMethodName(methodName) {
      this[methodName]();
    },
    SetPageIndex() {
      // Set the application state PageIndex to "Settings"
      this.$store.dispatch("SetPageIndex", this.$options.name);
    },

    ToggleSound() {
      // Set the ViewModel as the data we need
      var vm = this.SettingsItems_Toggles[0];
      vm.toggle = !vm.toggle;

      // Set the Icon of the ViewModel based on the Toggle value
      switch (vm.toggle) {
        case false:
          vm.icon = "mdi-volume-off";
          break;
        case true:
          vm.icon = "mdi-volume-high";
          break;
      }
      // Update our AppState by calling the Action
      this.$store.dispatch("ToggleSound", vm.toggle);
    },
    ToggleDarkMode() {
      // Set the ViewModel as the data we need
      var vm = this.SettingsItems_Toggles[1];
      vm.toggle = !vm.toggle;

      // Set the Icon of the ViewModel based on the Toggle value
      switch (vm.toggle) {
        case false:
          vm.icon = "mdi-weather-night";
          break;
        case true:
          vm.icon = "mdi-white-balance-sunny";
          break;
      }
      // Update our AppState by calling the Action
      this.$store.dispatch("ToggleDarkMode", vm.toggle);
    },
    SetTextSpeed(textSpeed) {
      this.$store.dispatch("SetTextSpeed", textSpeed);
    },
  },
  watch: {
    settingsModal: function () {
      // When the SettingsModal is opened, call SetPageIndex()
      this.SetPageIndex();
    },
  },
};
</script>

<style scoped >
.myClass:focus::before {
  opacity: 0 !important;
}
</style>