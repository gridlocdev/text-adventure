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
};
</script>

<style>
/* .v-btn--icon.theme--dark,
.v-btn--fab.theme--dark {
  color: red !important;
} */
/* .v-btn--fab.theme--dark {
  background-color: blue !important;
} */
/* .v-btn--icon.theme--light, .v-btn--fab.theme--light{
  color: red !important; 
} */
/* .v-btn--fab.theme--light {
  background-color: #eeeeee !important;
  border-color: #eeeeee !important;
} */
</style>
