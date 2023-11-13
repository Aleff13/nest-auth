import { customerIndex } from '../constant/customer.elastic';

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

export class CustomerSearchObject {
  public static searchObject(q: any) {
    const body = this.elasticSearchBody(q);
    return { index: customerIndex._index, body };
  }

  private static elasticSearchBody(q: any): ElasticSearchBody {
    const query = {
      match: {
        name: q,
      },
    };
    return new ElasticSearchBody(10, 0, query);
  }
}
