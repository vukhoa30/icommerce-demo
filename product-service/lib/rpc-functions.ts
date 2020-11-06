import * as ProductService from '../services/product';

const getProducts = async (filter: any, sort: any) => {
  return ProductService.getProducts(filter, sort);
}

const getProduct = async (id: number) => {
  return ProductService.getProduct(id);
}

const rpcHandler = async (reqData: any) => {
  let fn: Function;
  let args: any[];
  switch (reqData.fnName) {
    case 'getProducts':
      const filter = reqData.data.filter || {};
      const sort = reqData.data.sort || {};
      fn = getProducts; args = [filter, sort];
      break;
    case 'getProduct': fn = getProduct; args = [reqData.data.id]; break;
    default: fn = () => {}; args = []
  }
  return await fn(...args);
};

export { rpcHandler };
