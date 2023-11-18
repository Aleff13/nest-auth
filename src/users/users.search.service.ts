import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchServiceInterface } from '../search/interface/search.service.interface';
import { CustomerSearchObject } from '../search/object/customer.search.object';

export interface IUser {
  name: string;
  email: string;
  role: string;
}

export interface IUsersList {
  users: IUser[];
}

@Injectable()
export class UsersSearchService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject('SearchServiceInterface')
    private readonly searchService: SearchServiceInterface<any>,
  ) {}
  public async search(q: any): Promise<any> {
    const data = CustomerSearchObject.searchObject(q);
    return await this.searchService.searchIndex(data);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
