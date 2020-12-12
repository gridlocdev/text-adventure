<template>
  <Choice
    text="A hooded man is in the alleyway nearest you. You see he's stolen a woman's purse! What do you do next?"
    choice1="Chase Him"
    choice2="Run Away"
  />
</template>

<script>
import Choice from "../Sub-Components/Choice.vue";
export default {
  components: {
    Choice,
  },
};
</script>

<style>
</style>