import { Model } from 'objection';

interface IProductQueryStatistic {
  id?: number;
  productId?: number;
  filter?: any;
  sort?: any;
  createdAt?: any;
}

const columnNameMapping: any = {
  // App -> DB
  productId: 'productid',
  createdAt: 'createdat',
  id: 'id'
}

// @ts-ignore
class ProductQueryStatistic extends Model implements IProductQueryStatistic {

  static get tableName() {
    return 'product_query';
  }

  static columnNameMappers = {
    parse: (obj: any) => {
      let rslt: any = Object.assign({}, obj);
      Object.keys(columnNameMapping).forEach(k => {
        rslt[k] = obj[columnNameMapping[k]];
        delete rslt[columnNameMapping[k]];
      })
      return rslt;
    },
    format: (obj: any) => {
      let rslt: any = Object.assign({}, obj);
      Object.keys(columnNameMapping).forEach(k => {
        rslt[columnNameMapping[k]] = obj[k];
        delete rslt[k];
      })
      return rslt;
    }
  }

  static query(...args: any[]) {
    return super.query(...args).onBuildKnex(knexQueryBuilder => {
      knexQueryBuilder.on('query', (queryData: any) => {
        console.log('Raw SQL query:', queryData.sql);
      });
    });
  }
}

export { ProductQueryStatistic };
