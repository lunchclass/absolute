/**
 * router.ts
 */
import Vue from 'vue';
import Router from 'vue-router';

import * as component from '@/components';

Vue.use(Router);

export const router: Router = new Router({
  routes: [
    { path: '/', component: component.Home },
    { path: '/about', component: component.About },
    { path: '/list', component: component.List },
    { path: '/order', component: component.Order },
    { path: '/orderSuccess', component: component.OrderSuccess },
    { path: '/orderFailed', component: component.OrderFailed }
  ]
});
