<template>
  <v-container
    class="Start animate__animated animate__fadeIn"
    style="animation-duration: 0.5s"
  >
    <v-col>
      <v-row class="pa-md-2" align="center" justify="center">
        <h1>Text Adventure Game</h1>
      </v-row>
      <v-row class="pb-md-5 ma-2" align="center" justify="center">
        <h3>Test your might against the greatest of text adventures.</h3>
      </v-row>
      <v-row class="ma-xs-8 ma-sm-6 ma-md-2" align="center" justify="center">
        <v-btn
          @click="$router.push('chapter' + `${store.state.CurrentChapter}`)"
          elevation="2"
          x-large
          color="primary"
          class="animate__animated animate__pulse animate__infinite"
        >
          Start
        </v-btn>
      </v-row>
      <v-item-group mandatory>
        <v-container>
          <v-row class="my-3">
            <v-col v-for="n in 3" :key="n" cols="12" sm="4">
              <v-item v-slot="{ active, toggle }">
                <v-card
                  :color="active ? 'primary' : ''"
                  class="d-flex align-center"
                  outlined
                  elevation="3"
                  height="150"
                  @click="toggle"
                  :ripple="{ class: 'white--text'}"
                >
                  <v-scroll-y-transition>
                    <div
                      v-if="active"
                      class="display-3 flex-grow-1 text-center white--text"
                    >
                      Active
                    </div>
                  </v-scroll-y-transition>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </v-col>
  </v-container>
</template>

<script>
import store from "../store/index.js";

export default {
  name: "Start",
  mounted() {
    this.$store.dispatch("setPageIndex", this.$options.name);
  },
  data: function () {
    return {
      store: store,
    };
  },
};
</script>