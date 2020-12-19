import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    PageIndex: 'Start',
    Sound: false,
    DarkMode: false,
    TextSpeed: 50,
  },
  mutations: {
    setPageIndex(state, pageIndex) {
      state.PageIndex = pageIndex;
      console.log("(State) pageIndex: " + pageIndex);
    },
    toggleSound(state, soundToggle) {
      state.Sound = soundToggle;
      console.log("(State) soundToggle: " + soundToggle);
    },
    toggleDarkMode(state, darkModeToggle) {
      state.DarkMode = darkModeToggle;
      console.log("(State) darkModeToggle: " + darkModeToggle);
    },
    setTextSpeed(state, textSpeed) {
      state.TextSpeed = textSpeed;
      console.log("(State) textSpeed: " + textSpeed);
    }
  },
  actions: {
    setPageIndex(context, pageIndex) {
      context.commit('setPageIndex', pageIndex);
    },
    toggleSound(context, soundToggle) {
      context.commit('toggleSound', soundToggle);
    },
    toggleDarkMode(context, darkModeToggle) {
      context.commit('toggleDarkMode', darkModeToggle);
    },
    setTextSpeed(context, textSpeed) {
      context.commit('setTextSpeed', textSpeed);
    }
  },
  modules: {
  }
})
