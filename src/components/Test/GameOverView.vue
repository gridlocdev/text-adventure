<template>
  <v-row>
    <v-col>
      <GameOver
        text="The robber takes your arm, and mugs you instead."
      />
    </v-col>
  </v-row>
</template>

<script>
import GameOver from "../Sub-Components/GameOver.vue";
export default {
  components: { GameOver },
};
</script>

<style>
</style>