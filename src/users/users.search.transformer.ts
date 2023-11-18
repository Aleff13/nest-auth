import { Injectable } from '@nestjs/common';
import { ICustomerSearchObjectResult } from './interfaces/customer.object.search';

@Injectable()
export class UsersSearchTransformer {
  async elasticResultToUser(elasticResult: ICustomerSearchObjectResult[]) {
    const users = elasticResult?.map((user) => ({
      name: user._source.name,
      email: user._source.email,
      password: user._source.password,
      role: user._source.role,
    }));

    return users;
  }
}
