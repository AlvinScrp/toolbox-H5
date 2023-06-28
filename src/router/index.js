import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const features = ['json', 'urlencode', 'base64', 'hash', 'number', 'timestamp', 'ascii', 'color', 'about']
  .map((item) => ({
    path: `/${item}`,
    component: () => import(`../views/${item}/index.vue`)
  }))

const routes = [
  {
    path: '/',
    redirect: '/json'
  }
]
routes.push(...features)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
