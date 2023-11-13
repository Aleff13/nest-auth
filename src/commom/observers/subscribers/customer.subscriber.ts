import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { CustomerElasticIndex } from '../../../search/search-index/customer.elastic.index';
import { User } from '../../../users/entities/user.entity';

@Injectable()
export class PostSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    @InjectConnection() readonly connection: Connection,
    private readonly customerEsIndex: CustomerElasticIndex,
  ) {
    connection.subscribers.push(this);
  }

  public listenTo(): any {
    return User;
  }

  public async afterInsert(event: InsertEvent<User>): Promise<any> {
    return await this.customerEsIndex.insertCustomerDocument(event.entity);
  }

  public async afterUpdate(event: UpdateEvent<User>): Promise<any> {
    const user = event.entity as User;
    return await this.customerEsIndex.updateCustomerDocument(user);
  }
}
