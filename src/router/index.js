import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from '../views/Start.vue'

// import Success from '../views/InChapter/Success.vue'
// import GameOver from '../views/InChapter/GameOver.vue'
// import Ending from '../components/Content/Ending.vue'
// import PrivacyPolicy from '../views/PrivacyPolicy.vue'
// import StoryCreator from '../views/StoryCreator.vue'

//import ChapterSequencer from '../components/ContentContainers/ChapterSequencer.vue'

import store from '../store/index.js'
var storeVar = store;

Vue.use(VueRouter)

// Catch error while navigating to same page as already on
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Start',
    component: Start
  },
  {
    path: '*',
    redirect: '/',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: `/chapter:${storeVar.state.CurrentChapter}`,
    name: 'ChapterSequencer',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PlayStory/ChapterSequencer.vue')
  },
  {
    path: '/ending',
    name: 'Ending',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PlayStory/Chapters/Sections/Ending.vue')
  },
  {
    path: '/success',
    name: 'Success',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PlayStory/Chapters/ChoiceResult/Success.vue')
  },
  {
    path: '/gameover',
    name: 'GameOver',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PlayStory/Chapters/ChoiceResult/GameOver.vue')
  },
  {
    path: '/endgame',
    name: 'EndGame',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PlayStory/EndGame.vue')
  },
  {
    path: '/privacypolicy',
    name: 'PrivacyPolicy',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PrivacyPolicy.vue')
  },
  {
    path: '/storyCreator',
    name: 'StoryCreator',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/StoryCreator/StoryCreator.vue')
  },
  {
    path: '/importStory',
    name: 'ImportStory',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ImportStory/ImportStory.vue')
  },
  {
    path: '/storyLibrary',
    name: 'StoryLibrary',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/StoryLibrary.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/storyEditor:id',
    name: 'StoryEditor',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/StoryEditor/StoryEditor.vue')
  },

]

const router = new VueRouter({
  routes
})

router.afterEach((to) => {
  // If the user is done navigating to a URL that starts with "Chapter", redirect them to where they left off.
  if (to.path.includes('chapter') &&
    (to.path !== `/chapter:${storeVar.state.CurrentChapter}`)) {
    router.push({ path: `/chapter:${storeVar.state.CurrentChapter}` });
  }
  else if (to.path.includes('storyEditor') &&
    storeVar.state.StoryJSONArray.length != 0) {
    if (to.params.id.substring(1) <= storeVar.state.StoryJSONArray.length) {
      router.push({ path: `/storyEditor${to.params.id}` });
    }
    else {
      router.push({ path: `/storyLibrary` })
    }
  }
});
export default router
