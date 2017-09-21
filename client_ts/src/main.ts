/**
 * main.ts
 */
import Vue from 'vue';
import VueMaterial from 'vue-material';

import { Navbar } from '@/components/navbar';
import { router } from '@/router';

import '@/styles/style.css';

Vue.use(VueMaterial);

Vue.config.productionTip = false;

// tslint:disable-next-line:no-unused-new
new Vue({
  el: '#app-main',
  router,
  components: {
    navbar: Navbar
  }
});
