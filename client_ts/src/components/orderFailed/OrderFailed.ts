/**
 * components/orderFailed/OrderFailed.ts
 */
import Vue from 'vue';
import Component from 'vue-class-component';

import { logger } from '@/utils/logger';

@Component({
  template: <string>require('./order_failed.html')
})
export class OrderFailed extends Vue {
  public mounted(): void {
    this.$nextTick(() => logger.info('OrderFailed mounted'));
  }
}
