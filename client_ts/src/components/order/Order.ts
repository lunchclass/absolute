/**
 * components/about/order.ts
 */
import Vue from 'vue';
import Component from 'vue-class-component';

import { logger } from '@/utils/logger';

@Component({
  template: <string>require('./order.html')
})
export class Order extends Vue {

  public temperature: String = 'hot';
  public size: String = 'tall';
  public ice: String = 'normal';

  public mounted(): void {
    this.$nextTick(() => logger.info('Order mounted'));
  }
}
