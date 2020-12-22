<template>
  <v-row>
    <v-col>
      <GameOver
        :text="this.$store.state.GameOverText"
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