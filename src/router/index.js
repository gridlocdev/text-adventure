import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from '../views/Start.vue'
import Intro from '../components/Content/Intro.vue'
import Success from '../components/Content/Success.vue'
import Choice from '../components/Content/Choice.vue'
import GameOver from '../components/Content/GameOver.vue'
import Ending from '../components/Content/Ending.vue'
import Chapter1 from '../views/Chapter1.vue'

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
    path: '/ending',
    name: Ending,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Content/Ending.vue')
  },
  {
    path: '/intro',
    name: Intro,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Content/Intro.vue')
  },
  {
    path: '/success',
    name: Success,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Content/Success.vue')
  },
  {
    path: '/choice',
    name: Choice,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Content/Choice.vue')
  },
  {
    path: '/gameover',
    name: GameOver,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Content/GameOver.vue')
  },
  {
    path: '/chapter1',
    name: Chapter1,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Chapter1.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router
