import { Model } from 'objection';

interface IProduct {
  id: number;
  name: string;
  description?: string;
  branch?: string;
  color?: string;
}

// @ts-ignore
class Product extends Model implements IProduct {
  static get tableName() {
    return 'product';
  }

  id = 0;
  name = '';
  description?: string;
  branch?: string;
  color?: string;

  static query(...args: any[]) {
    return super.query(...args).onBuildKnex(knexQueryBuilder => {
      knexQueryBuilder.on('query', (queryData: any) => {
        console.log('Raw SQL query:', queryData.sql);
      });
    });
  }
}

export { Product, IProduct };
