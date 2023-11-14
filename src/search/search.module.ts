import { Module } from '@nestjs/common';
import { SearchService } from './search.service';

@Module({
  imports: [],
  providers: [
    SearchService,
    {
      provide: 'SearchServiceInterface',
      useClass: SearchService,
    },
  ],
  controllers: [],
  exports: [SearchModule],
})
export class SearchModule {}
