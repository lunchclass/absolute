/**
 * components/home/Home.ts
 */
import Vue from 'vue';
import Component from 'vue-class-component';

import { logger } from '@/utils/logger';

import '@/styles/style.css';

@Component({
  template: <string>require('./home.html')
})
export class Home extends Vue {

  public mounted(): void {
    this.$nextTick(() => logger.info('Home mounted'));
  }
}
