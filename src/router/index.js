import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const features = [
  'json',
  'urlencode',
  'timestamp',
  'color',
  'qrcode',
  'base64',
  'hash',
  'number',
  'imagelayout',
  'ascii',
  'about'
].map((item) => ({
  path: `/${item}`,
  component: () => import(`../views/${item}/index.vue`)
}));

const routes = [
  {
    path: '/',
    redirect: '/json'
  }
];
routes.push(...features);

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;
