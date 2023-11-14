import { customerIndex } from '../constant/customer.elastic';
import { BaseSearchObject } from './base.search.object';

export class ElasticSearchBody {
  size: number;
  from: number;
  query: any;

  constructor(size: number, from: number, query: any) {
    this.size = size;
    this.from = from;
    this.query = query;
  }
}

export class CustomerSearchObject extends BaseSearchObject {
  allowedProperties: RegExp;

  constructor() {
    super();
    this.allowedProperties = /^(name|role|email)$/;
  }

  public static searchObject(q: any) {
    const { key, value } = this.extractKeyValue(q);
    const body = this.elasticSearchBody(key, value);
    return { index: customerIndex._index, body };
  }

  private static elasticSearchBody(
    propertieName = 'name',
    value: any,
  ): ElasticSearchBody {
    const query = {
      match: {
        [propertieName]: value,
      },
    };
    return new ElasticSearchBody(10, 0, query);
  }
}
