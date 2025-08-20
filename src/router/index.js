import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const features = [
  'json',
  'urlencode',
  'unicode',
  'timestamp',
  'color',
  'qrcode',
  'base64',
  'hash',
  'number',
  'imagelayout',
  'ascii',
  'markdown',
  'about'
].map((item) => ({
  path: `/${item}`,
  component: () => import(`../views/${item}/index.vue`)
}));

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  }
];
routes.push(...features);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
