<template>
  <v-row>
    <v-col>
      <Success
        :text="this.$store.state.SuccessText"
      />
    </v-col>
  </v-row>
</template>

<script>
import Success from "../Sub-Components/Success.vue";
export default {
  components: { Success },
};
</script>

<style>
</style>