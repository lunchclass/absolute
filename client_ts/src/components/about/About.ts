/**
 * components/about/About.ts
 */
import Vue from 'vue';
import Component from 'vue-class-component';

import { logger } from '@/utils/logger';

@Component({
  template: <string>require('./about.html')
})
export class About extends Vue {
  public mounted(): void {
    this.$nextTick(() => logger.info('About mounted'));
  }
}
