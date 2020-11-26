<template>
  <v-app id="inspire">
    <HeaderBar />

    <v-main>
      <!-- <Start /> -->
      <CustomText look="happy" text="aaa" />
    </v-main>
  </v-app>
</template>
<script>
//import MyComponent from './components/MyComponent.vue';
import HeaderBar from "./components/Navigation/HeaderBar.vue";
// import Start from "./components/Main View/Start.vue";
import CustomText from "./components/Main View/CustomText.vue";

// import AnimateCSS from 'AnimateCSS'

export default {
  name: "App",

  components: {
    //MyComponent,
    HeaderBar,
    // Start,
    CustomText,
  },

  data: () => ({
    //
  }),
};
</script>
