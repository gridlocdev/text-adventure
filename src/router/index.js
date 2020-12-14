import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from '../views/Start.vue'
import Prologue from '../views/Prologue.vue'
import IntroView from '../components/Test/IntroView.vue'
import TypewriterView from '../components/Test/TypewriterView.vue'
import ChoiceView from '../components/Test/ChoiceView.vue'
import GameOverView from '../components/Test/GameOverView.vue'

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
    path: '/prologue',
    name: Prologue,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Prologue.vue')
  },
  {
    path: '/intro',
    name: IntroView,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Test/IntroView.vue')
  },
  {
    path: '/typewriter',
    name: TypewriterView,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Test/TypewriterView.vue')
  },
  {
    path: '/choice',
    name: ChoiceView,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Test/ChoiceView.vue')
  },
  {
    path: '/gameover',
    name: GameOverView,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Test/GameOverView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
