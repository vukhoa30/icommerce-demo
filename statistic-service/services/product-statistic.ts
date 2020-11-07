import { ProductQueryStatistic } from '../lib/models';

// e.g. sort = { 'id': 'desc/asc' }
// e.g. filter = { 'id': ???, description: ??? }
const getProductQueryStatistic = (filter?: string[], sort?: string[], from?: Date, to?: Date) => {
  const query = ProductQueryStatistic.query().where('productid', 'is', null);
  if (Array.isArray(filter)) {
    filter.forEach(f => query.andWhereRaw('filter->? is not null', f));
  }
  if (Array.isArray(sort)) {
    sort.forEach(f => query.andWhereRaw('sort->? is not null', f));
  }
  
  if (from && to) {
    query.andWhere('createdat', '>=', from).andWhere('createdat', '<=', to);
  }
  return query;
}

const getProductDetailViewStatistic = (ids?: number[], from?: Date, to?: Date) => {
  const query = ProductQueryStatistic.query()
  if (Array.isArray(ids)) {
    query.whereIn('productid', ids);
  }
  if (from && to) {
    query.andWhere('createdat', '>=', from).andWhere('createdat', '<=', to);
  }
  return query;
}

const addProductStatistic = (pqs: any) => ProductQueryStatistic.query().insert(pqs);

export {
  getProductQueryStatistic,
  getProductDetailViewStatistic,
  addProductStatistic
}
