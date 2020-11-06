import { Product } from '../lib/models';

// e.g. sort = { 'id': 'desc/asc' }
// e.g. filter = { 'id': ???, description: ??? }
const getProducts = (filter: any, sort: any) => {
  const sortBy = Object.keys(sort)[0];
  const direction = sortBy && sort[sortBy];
  const query = Product.query();

  Object.keys(filter).forEach((key, idx) => {
    if (idx === 0) {
      query.where(key, 'like', filter[key]);
    } else {
      query.andWhere(key, 'like', filter[key]);
    }
  })
  if (sortBy) {
    query.orderBy(sortBy, direction);
  }
  return query;
}

const getProduct = (id: number) => Product.query().findById(id);

export { getProducts, getProduct }
