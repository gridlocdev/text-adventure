<template>
<v-app id="inspire">

  <!-- START APP Bar -->
    <NAVHeaderBar/>
  <!-- END APP Bar -->

    <v-main>
      Here's my Content!
      <!--  -->
    </v-main>
  </v-app>
</template>
<script>
//import MyComponent from './components/MyComponent.vue';
import NAVHeaderBar from './components/NAVHeaderBar.vue';

export default {
  name: 'App',

  components: {
    //MyComponent,
    NAVHeaderBar,
  },

  data: () => ({ 
    //
    }),
};
</script>
