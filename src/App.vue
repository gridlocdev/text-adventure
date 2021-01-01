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

export default {
  name: "App",
  components: {
    HeaderBar,
  },
};
</script>

<style>
html {
  overflow-y: hidden !important;
}
</style>
