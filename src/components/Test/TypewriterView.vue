<template>
  <v-container>
    <typewriter
      :key="text[textIndex]"
      v-bind:text="text[textIndex]"
      v-on:finished-typing="makeVisible()"
    />

    <v-btn
      :key="this.visible"
      v-show="this.visible"
      :bottom="true"
      :right="true"
      :absolute="true"
      class="animate__animated animate__fadeIn pa-7 mr-5"
      primary
      @click="this.clickMe"
    >
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
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
      visible: false,
      text: [
        "You wake up to the prodding of one of the King’s servants. “Wake up, Hero. The King requires your counsel immediately! Come with me”",
        "You hurriedly meander through the town market following the servant, over the moat, and through the castle walls into the King’s throne room. As you enter, you hear a familiar boisterous voice.",
        "“Welcome hero. We seem to have another problem on our hands, our scaly friend in the mountains has been causing quite the ruckus. This is causing our fellow people of Hamelot a great dismay, and I need you to take care of it.” the King proclaims. ",
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
    makeVisible() {
      console.log("I've been hit!");
      this.visible = true;
    },
  },
  // mounted() {
  //   this.$refs.typewriter.$on("finished-typing");
  // },
};
</script>

<style>
</style>