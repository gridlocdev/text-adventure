import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    PageIndex: 'Start',
    Sound: false,
    DarkMode: false,
    TextSpeed: 50,
    ChapterIconList: ['mdi-crown-outline', 'mdi-bridge', 'mdi-sword-cross', 'mdi-wizard-hat', 'mdi-image-filter-hdr'],
    GameOverText: 'The robber mugs u',
    CurrentChapter: 1,
    NumberOfChapters: 5
  },
  mutations: {
    setNumberOfChapters(state, number) {
      state.ChapterIconList = number;
      console.log("(State) CurrentChapter: " + number);
    },
    setChapterIconArray(state, array) {
      state.ChapterIconList = array;
      console.log("(State) CurrentChapter: " + array);
    },
    setCurrentChapter(state, number) {
      state.CurrentChapter = number;
      console.log("(State) CurrentChapter: " + number);
    },
    setGameOverText(state, text) {
      state.GameOverText = text;
      console.log("(State) GameOverText: " + text);
    },
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
    setNumberOfChapters(context, number) {
      context.commit('setCurrentChapter', number);
    },
    setChapterIconArray(context, array) {
      context.commit('setCurrentChapter', array);
    },
    setCurrentChapter(context, number) {
      context.commit('setCurrentChapter', number);
    },
    setGameOverText(context, text) {
      context.commit('setGameOverText', text);
    },
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
