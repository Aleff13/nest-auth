import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { SearchService } from '../../search/search.service';
import { CustomerElasticIndex } from '../../search/search-index/customer.elastic.index';
import { PostSubscriber } from './subscribers/customer.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: 'SearchServiceInterface',
      useClass: SearchService,
    },
    CustomerElasticIndex,
    PostSubscriber,
  ],
  controllers: [],
  exports: [],
})
export class ObserverModule {}
