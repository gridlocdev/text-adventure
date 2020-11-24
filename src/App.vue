<template>
  <v-app id="inspire">
    <HeaderBar />

    <v-main>
      <Start />
    </v-main>
  </v-app>
</template>
<script>
//import MyComponent from './components/MyComponent.vue';
import HeaderBar from "./components/Navigation/HeaderBar.vue";
import Start from "./components/Main View/Start.vue";

export default {
  name: "App",

  components: {
    //MyComponent,
    HeaderBar,
    Start,
  },

  data: () => ({
    //
  }),
};
</script>
