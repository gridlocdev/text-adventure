<template>
  <div>
    <CustomText look="scared" text="scared" /> <br />
    <br />
    <CustomText look="emphasis" text="emphasis" /> <br />
    <br />
    <CustomText look="happy" text="happy" /> <br />
    <br />
    <CustomText look="tired" text="tired" /> <br />
    <br />
  </div>
</template>

<script>
import CustomText from "../Sub-Components/CustomText.vue";

export default {
  components: {
    CustomText,
  },
};
</script>

<style>
</style>