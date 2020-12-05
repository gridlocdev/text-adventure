import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from '../views/Start.vue'
import Prologue from '../views/Prologue.vue'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
