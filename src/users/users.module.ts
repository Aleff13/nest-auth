import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SearchService } from '../search/search.service';
import { UsersSearchService } from './users.search.service';
import { UsersSearchTransformer } from './users.search.transformer';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersSearchService,
    {
      provide: 'SearchServiceInterface',
      useClass: SearchService,
    },
    UsersSearchTransformer,
  ],
})
export class UsersModule {}
