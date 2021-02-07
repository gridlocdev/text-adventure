<template>
  <v-app
    id="inspire"
    :style="{ background: $vuetify.theme.themes[theme].background }"
  >
    <header-bar />
    <v-main>
      <v-container fluid fill-height>
        <keep-alive>
          <router-view />
        </keep-alive>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HeaderBar from "./components/Navigation/HeaderBar.vue";
import store from "./store";

export default {
  name: "App",
  components: {
    HeaderBar,
  },
  computed: {
    theme() {
      const bodyElement = document.getElementsByTagName("body")[0];
      if (this.$vuetify.theme.dark == true) {
        bodyElement.classList = "darkScrollbar";
      } else {
        bodyElement.classList = "";
      }
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  store: store,
  beforeCreate() {
    this.$store.commit("initializeStore");

    this.$vuetify.theme.dark = this.$store.state.DarkMode;
  },
};
</script>

<style>
@import "./DarkScrollbar.css";

html {
  overflow: auto !important;
}

.v-btn.theme--light.v-btn--has-bg:not(.primary):not(.success):not(.error) {
  background-color: #ffffff;
}
</style>
