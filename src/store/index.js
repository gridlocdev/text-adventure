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
    SetPageIndex(state, pageIndex) {
      state.PageIndex = pageIndex;
      console.log("(State) pageIndex: "+ pageIndex);
    },
    ToggleSound(state, soundToggle) {
      state.Sound = soundToggle;
      console.log("(State) soundToggle: "+ soundToggle);
    },
    ToggleDarkMode(state, darkModeToggle) {
      state.DarkMode = darkModeToggle;
      console.log("(State) darkModeToggle: "+ darkModeToggle);
    },
    SetTextSpeed(state, textSpeed) {
      state.TextSpeed = textSpeed;
      console.log("(State) textSpeed: "+ textSpeed);
    }
  },
  actions: {
    SetPageIndex(context, pageIndex) {
      context.commit('SetPageIndex', pageIndex);
    },
    ToggleSound(context, soundToggle) {
      context.commit('ToggleSound', soundToggle);
    },
    ToggleDarkMode(context, darkModeToggle) {
      context.commit('ToggleDarkMode', darkModeToggle);
    },
    SetTextSpeed(context, textSpeed) {
      context.commit('SetTextSpeed', textSpeed);
    }
  },
  modules: {
  }
})
