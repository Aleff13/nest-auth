import { Inject, Injectable } from '@nestjs/common';
import { SearchServiceInterface } from '../interface/search.service.interface';
import { User } from '../../users/entities/user.entity';
import { customerIndex } from '../constant/customer.elastic';

@Injectable()
export class CustomerElasticIndex {
  constructor(
    @Inject('SearchServiceInterface')
    private readonly searchService: SearchServiceInterface<any>,
  ) {}

  public async insertCustomerDocument(customer: User): Promise<any> {
    const data = this.customerDocument(customer);
    return await this.searchService.insertIndex(data);
  }

  public async updateCustomerDocument(customer: User): Promise<any> {
    const data = this.customerDocument(customer);
    await this.deleteCustomerDocument(customer.id);

    return await this.searchService.insertIndex(data);
  }

  private async deleteCustomerDocument(customerId: number): Promise<any> {
    const data = {
      index: customerIndex._index,
      //   _type: customerIndex._type,
      id: customerId.toString(),
    };

    return await this.searchService.deleteDocument(data);
  }

  private bulkIndex(customerId: number): any {
    return {
      _index: customerIndex._index,
      //   _type: customerIndex._type,
      _id: customerId,
    };
  }

  private customerDocument(customer: User): any {
    const bulk = [];

    bulk.push({
      index: this.bulkIndex(customer.id),
    });
    bulk.push(customer);

    return {
      body: bulk,
      index: customerIndex._index,
      //   _type: customerIndex._type,
    };
  }
}
