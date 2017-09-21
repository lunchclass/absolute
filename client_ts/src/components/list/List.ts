/**
 * components/list/List.ts
 */
import Vue from 'vue';
import Component from 'vue-class-component';

import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { IUser } from '@/components/list/types.ts';
import { logger } from '@/utils/logger';

// https://router.vuejs.org/kr/advanced/data-fetching.html#탐색하기-전에-가져-오기
// https://github.com/vuejs/vue-class-component#adding-custom-hooks

@Component({
  template: <string>require('./list.html')
})
export class List extends Vue {
  public items: IUser[] = [];
  private url: string = 'https://jsonplaceholder.typicode.com/users';
  private axios: AxiosInstance;

  constructor() {
    super();
    this.axios = axios;
  }

  public created(): void {
    logger.info('List created');
    this.fetchData();
  }

  public mounted(): void {
    this.$nextTick(() => logger.info('List mounted'));
  }

  private fetchData(): void {
    if (this.items.length) {
      return;
    }

    this.axios.get(this.url)
      .then((response: AxiosResponse) => {
        this.items = response.data;
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }
}
