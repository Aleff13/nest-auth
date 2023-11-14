import { customerIndex } from '../constant/customer.elastic';
import { BaseSearchObject } from './base.search.object';
import {
  CustomerSearchObject,
  ElasticSearchBody,
} from './customer.search.object';

describe('Base Search Object', () => {
  let service: CustomerSearchObject;

  beforeEach(async () => {
    service = new CustomerSearchObject();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a customer search object', async () => {
    const result = CustomerSearchObject.searchObject({ name: 'foo' });

    expect(result).toEqual({
      index: customerIndex._index,
      body: {
        from: 0,
        query: {
          match: {
            name: 'foo',
          },
        },
        size: 10,
      },
    });
  });

  it('should return a customer search object with undefined value', async () => {
    const result = CustomerSearchObject.searchObject({});

    expect(result).toEqual({
      index: customerIndex._index,
      body: {
        from: 0,
        query: {
          match: {
            name: undefined,
          },
        },
        size: 10,
      },
    });
  });

  it('should return customer object using number in record', async () => {
    const result = CustomerSearchObject.searchObject({ role: 1 });

    expect(result).toEqual({
      index: customerIndex._index,
      body: {
        from: 0,
        query: {
          match: {
            role: 1,
          },
        },
        size: 10,
      },
    });
  });

  it('should return customer object using number in record', async () => {
    const result = CustomerSearchObject.searchObject({ role: 1 });

    expect(result).toEqual({
      index: customerIndex._index,
      body: {
        from: 0,
        query: {
          match: {
            role: 1,
          },
        },
        size: 10,
      },
    });
  });
});
