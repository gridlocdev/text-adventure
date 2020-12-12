<template>
  <v-container>
    <typewriter :key="text[textIndex]" v-bind:text="text[textIndex]" />
    <v-btn primary @click="this.clickMe"> <v-icon>mdi-arrow-right</v-icon> </v-btn>
  </v-container>
</template>

<script>
import Typewriter from "../Sub-Components/Typewriter";
export default {
  components: {
    Typewriter,
  },
  data: function () {
    return {
      textIndex: 0,
      text: [
        "I am message 1. I. Am. Message. ONEEEEE!!!!.",
        "The FitnessGram PACER Test is a multistage aerobic capacity test that progressively gets more difficult as it continues.The test is used to measure a student's aerobic capacity as part of the FitnessGram assessment. Students run back and forth as many times as they can, each lap signaled by a beep sound. The test get progressively faster as it continues until the student reaches their max lap score. The PACER Test score is combined in the FitnessGram software with scores for muscular strength, endurance, flexibility and body composition to determine whether a student is in the Healthy Fitness Zone™ or the Needs Improvement Zone™.",
        "I am text three.",
      ],
    };
  },
  methods: {
    clickMe: function () {
      if (this.textIndex < this.text.length - 1) {
        this.textIndex++;
        //console.log(this.textIndex);
      } else {
        this.textIndex = 0;
        //console.log(this.textIndex);
      }
    },
  },
};
</script>

<style>
</style>