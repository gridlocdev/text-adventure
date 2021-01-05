import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    PageIndex: 'Start',
    DarkMode: false,
    TextSpeed: 10,
    StoryName: 'Text Adventure Game',
    ChapterIconList: ['mdi-crown-outline', 'mdi-bridge', 'mdi-sword-cross', 'mdi-wizard-hat', 'mdi-image-filter-hdr'],
    SuccessText: 'You mug the robber!',
    GameOverText: 'The robber mugs u',
    CurrentChapter: 1,
    NumberOfChapters: 2,
    SequencerIndex: 0,
    ResetChapter: false,
    ResetIntroFade: false
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('PageIndex')) {
        state.PageIndex = localStorage.getItem('PageIndex');
        console.log("Loaded from LocalStorage: PageIndex - " + state.PageIndex)
      }
      if (localStorage.getItem('DarkMode')) {
        state.DarkMode = localStorage.getItem('DarkMode') == 'true';
        
        console.log("Loaded from LocalStorage: DarkMode - " + state.DarkMode)
      }
      if (localStorage.getItem('TextSpeed')) {
        state.TextSpeed = parseInt(localStorage.getItem('TextSpeed'));
        console.log("Loaded from LocalStorage: TextSpeed - " + state.TextSpeed)
      }
      if (localStorage.getItem('StoryName')) {
        state.StoryName = localStorage.getItem('StoryName');
        console.log("Loaded from LocalStorage: StoryName - " + state.StoryName)
      }
      if (localStorage.getItem('ChapterIconList')) {
        state.ChapterIconList = JSON.parse(localStorage.getItem('ChapterIconList'));
        console.log("Loaded from LocalStorage: ChapterIconList - " + state.ChapterIconList)
      }
      if (localStorage.getItem('SuccessText')) {
        state.SuccessText = localStorage.getItem('SuccessText');
        console.log("Loaded from LocalStorage: SuccessText - " + state.SuccessText)
      }
      if (localStorage.getItem('GameOverText')) {
        state.GameOverText = localStorage.getItem('GameOverText');
        console.log("Loaded from LocalStorage: GameOverText - " + state.GameOverText)
      }
      if (localStorage.getItem('CurrentChapter')) {
        state.CurrentChapter = parseInt(localStorage.getItem('CurrentChapter'));
        console.log("Loaded from LocalStorage: CurrentChapter - " + state.CurrentChapter)
      }
      if (localStorage.getItem('NumberOfChapters')) {
        state.NumberOfChapters = parseInt(localStorage.getItem('NumberOfChapters'));
        console.log("Loaded from LocalStorage: NumberOfChapters - " + state.NumberOfChapters)
      }
      if (localStorage.getItem('SequencerIndex')) {
        state.SequencerIndex = parseInt(localStorage.getItem('SequencerIndex'));
        console.log("Loaded from LocalStorage: SequencerIndex - " + state.SequencerIndex)
      }
      if (localStorage.getItem('ResetChapter')) {
        state.ResetChapter = localStorage.getItem('ResetChapter') == 'true';
        console.log("Loaded from LocalStorage: ResetChapter - " + state.ResetChapter)
      }
      if (localStorage.getItem('ResetIntroFade')) {
        state.ResetIntroFade = localStorage.getItem('ResetIntroFade') == 'true';
        console.log("Loaded from LocalStorage: ResetIntroFade - " + state.ResetIntroFade)
      }
    },
    resetIntroFade(state) {
      state.ResetIntroFade = true;
      localStorage.setItem('resetIntroFade', true);
      console.log("(State) ResetIntroFade: " + "true");
    },
    setStoryName(state, text) {
      state.StoryName = text;
      localStorage.setItem('StoryName', text);
      console.log("(State) StoryName: " + text);
    },
    resetChapter(state) {
      state.ResetChapter = true;
      localStorage.setItem('ResetChapter', true);
      console.log("(State) ResetChapter: " + "true");
    },
    setSequencerIndex(state, number) {
      state.SequencerIndex = number;
      localStorage.setItem('SequencerIndex', number);
      console.log("(State) SequencerIndex: " + number);
    },
    setNumberOfChapters(state, number) {
      state.NumberOfChapters = number;
      localStorage.setItem('ChapterIconList', number);
      console.log("(State) CurrentChapter: " + number);
    },
    setChapterIconArray(state, array) {
      state.ChapterIconList = array;
      localStorage.setItem('ChapterIconList', JSON.stringify(array));
      console.log("(State) CurrentChapter: " + array);
    },
    setCurrentChapter(state, number) {
      state.CurrentChapter = number;
      localStorage.setItem('CurrentChapter', number);
      console.log("(State) CurrentChapter: " + number);
    },
    setSuccessText(state, text) {
      state.SuccessText = text;
      localStorage.setItem('SuccessText', text);
      console.log("(State) SuccessText: " + text);
    },
    setGameOverText(state, text) {
      state.GameOverText = text;
      localStorage.setItem('GameOverText', text);
      console.log("(State) GameOverText: " + text);
    },
    setPageIndex(state, pageIndex) {
      state.PageIndex = pageIndex;
      localStorage.setItem('PageIndex', pageIndex);
      console.log("(State) pageIndex: " + pageIndex);
    },
    toggleDarkMode(state, darkModeToggle) {
      state.DarkMode = darkModeToggle;
      localStorage.setItem('DarkMode', darkModeToggle);
      console.log("(State) darkModeToggle: " + darkModeToggle);
    },
    setTextSpeed(state, textSpeed) {
      state.TextSpeed = textSpeed;
      localStorage.setItem('TextSpeed', textSpeed);
      console.log("(State) textSpeed: " + textSpeed);
    }
  },
  actions: {
    resetIntroFade(context) {
      context.commit('resetIntroFade');
    },
    setStoryName(context, text) {
      context.commit('setStoryName', text);
    },
    resetChapter(context) {
      context.commit("resetChapter")
    },
    setSequencerIndex(context, number) {
      context.commit('setSequencerIndex', number);
    },
    setNumberOfChapters(context, number) {
      context.commit('setCurrentChapter', number);
    },
    setChapterIconArray(context, array) {
      context.commit('setCurrentChapter', array);
    },
    setCurrentChapter(context, number) {
      context.commit('setCurrentChapter', number);
    },
    setSuccessText(context, text) {
      context.commit('setSuccessText', text);
    },
    setGameOverText(context, text) {
      context.commit('setGameOverText', text);
    },
    setPageIndex(context, pageIndex) {
      context.commit('setPageIndex', pageIndex);
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
