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
                class="ma-2"
                color="grey lighten-3"
                fab
                @click="!item.toggle"
              >
                <v-icon>{{ item.toggleOnIcon }}</v-icon>
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
              <v-btn-toggle tile color="accent-3" group>
                <v-btn value="left"> Slow </v-btn>

                <v-btn value="center"> Normal </v-btn>

                <v-btn value="right"> Fast </v-btn>
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
name: 'Settings',
data: () => ({
    settingsModal: false,
    SettingsItems_Toggles: [
      {
        title: "Sound",
        toggleOffIcon: "mdi-volume-off",
        toggleOnIcon: "mdi-volume-high",
        toggle: false,
      },
      {
        title: "Dark Mode",
        toggleOffIcon: "mdi-white-balance-sunny",
        toggleOnIcon: "mdi-weather-night",
        toggle: true,
      },
    ],
    SettingsItems_ChoiceBtns: [
      {
        title: "Text Speed",
        toggleOnIcon: "mdi-form-textbox",
        currentIndex: 2,
      },
    ],
})

}
</script>

<style>
</style>