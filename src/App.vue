<template>
  <v-app id="inspire">
    <HeaderBar />
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
  store: store,
  beforeCreate() {
    this.$store.commit("initializeStore");

    this.$vuetify.theme.dark = this.$store.state.DarkMode;
  },
};
</script>

<style>
/* html {
  overflow-y: hidden !important;
} */
</style>
