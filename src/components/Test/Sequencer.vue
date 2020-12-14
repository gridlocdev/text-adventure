<template>
  <div>
    <ChoiceView
      text="A hooded man is in the alleyway nearest you. You see he's stolen a woman's purse! What do you do next?"
      choice1="Chase Him"
      choice2="Run Away"
    />
    <TypewriterView/>
  </div>
</template>

<script>
import ChoiceView from "./ChoiceView.vue";
import TypewriterView from "./TypewriterView.vue";

export default {
  components: { ChoiceView, TypewriterView },
};
</script>

<style>
</style>