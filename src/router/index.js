import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from '../views/Start.vue'
import IntroView from '../components/Test/IntroView.vue'
import SuccessView from '../components/Test/SuccessView.vue'
import ChoiceView from '../components/Test/ChoiceView.vue'
import GameOverView from '../components/Test/GameOverView.vue'
import EndingView from '../components/Test/EndingView.vue'
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
    name: EndingView,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Test/EndingView.vue')
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
    path: '/success',
    name: SuccessView,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Test/SuccessView.vue')
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
