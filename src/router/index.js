import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from '../views/Start.vue'
import EndGame from '../views/EndGame.vue'


import Success from '../views/InChapter/Success.vue'
import GameOver from '../views/InChapter/GameOver.vue'
import Ending from '../components/Content/Ending.vue'

import ChapterSequencer from '../components/ContentContainers/ChapterSequencer.vue'

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
    path: '/chapterSequencer',
    name: ChapterSequencer,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/ContentContainers/ChapterSequencer.vue')
  },
  {
    path: '/ending',
    name: Ending,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Content/Ending.vue')
  },
  {
    path: '/success',
    name: Success,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/InChapter/Success.vue')
  },
  {
    path: '/gameover',
    name: GameOver,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/InChapter/GameOver.vue')
  },
  {
    path: '/endgame',
    name: EndGame,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EndGame.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router
