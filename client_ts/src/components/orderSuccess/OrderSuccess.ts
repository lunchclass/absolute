/**
 * components/orderSuccess/OrderSuccess.ts
 */
import Vue from 'vue';
import Component from 'vue-class-component';

import { logger } from '@/utils/logger';

@Component({
  template: <string>require('./orderSuccess.html')
})
export class OrderSuccess extends Vue {
  public mounted(): void {
    this.$nextTick(() => logger.info('OrderSuccess mounted'));
  }
}
