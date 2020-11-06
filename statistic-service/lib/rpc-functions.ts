import * as ProductStatisticService from '../services/product-statistic';

const getProductQueryStatistic = async (filter?: any, sort?: any, from?: Date, to?: Date) => {
  return ProductStatisticService.getProductQueryStatistic(filter, sort, from, to);
}

const getProductDetailViewStatistic = async (ids?: number[], from?: Date, to?: Date) => {
  return ProductStatisticService.getProductDetailViewStatistic(ids, from, to);
}

const rpcHandler = async (reqData: any) => {
  let fn: Function;
  let args: any[];
  switch (reqData.fnName) {
    case 'getProductQueryStatistic': {
      const filter = reqData.data.filter || {};
      const sort = reqData.data.sort || {};
      const from = reqData.data.from || null;
      const to = reqData.data.to || null;
      fn = getProductQueryStatistic; args = [filter, sort, from, to];
      break;
    }
    case 'getProductDetailViewStatistic': {
      const ids = reqData.data.ids || [];
      const from = reqData.data.from || null;
      const to = reqData.data.to || null;
      fn = getProductDetailViewStatistic; args = [ids, from, to];
      break;
    }
    default: fn = () => {}; args = []
  }
  return fn(...args);
};

export { rpcHandler };
