/**
 * components/navbar/Navbar.ts
 */
import Vue from 'vue';
import Component from 'vue-class-component';
import Router from 'vue-router';

import { ILink } from '@/components/navbar/types.ts';
import { logger } from '@/utils/logger';

import '@/styles/style.css';

@Component({
  template: <string>require('./navbar.html'),
  watch: {
    $route(current: Router.Route, previous: Router.Route): void {
      logger.info('Changed current path to: ' + this.$route.path);
    }
  }
})
export class Navbar extends Vue {
  public links: ILink[] = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' }
  ];

  public mounted(): void {
    this.$nextTick(() => logger.info('Navbar mounted'));
  }
}
