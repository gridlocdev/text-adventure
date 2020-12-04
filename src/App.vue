<template>
  <v-app id="inspire">
    <HeaderBar />
    <v-main>
      <v-container fluid fill-height>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
//import MyComponent from './components/MyComponent.vue';
import HeaderBar from "./components/Navigation/HeaderBar.vue";

//import CustomText from "./components/Sub-Components/CustomText.vue";

export default {
  name: "App",

  components: {
    //MyComponent,
    HeaderBar,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
</style>
