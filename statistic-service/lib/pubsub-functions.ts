import * as ProductStatisticService from '../services/product-statistic';
import { SERVICE_EXCHANGE_MAINAPP_QUERY } from '../configs/constants';

const addProductStatistic = async (statistic: any) => {
  return ProductStatisticService.addProductStatistic(statistic);
}

const subscriptionHandler = async (exchange: string, data: any) => {
  let fn: Function;
  let args: any[];
  switch (exchange) {
    case SERVICE_EXCHANGE_MAINAPP_QUERY: {
      // let statistic;
      // const productId = data.productId;
      fn = addProductStatistic;
      args = [data];
      break;
    }
    default: fn = () => {}; args = []
  }
  return fn(...args);
};

export { subscriptionHandler };
