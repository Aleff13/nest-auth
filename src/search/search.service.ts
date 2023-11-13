import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigSearch } from './config/config.search';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchServiceInterface } from './interface/search.service.interface';

const ELASTIC_HOST = 'http://localhost:9200';

@Injectable()
export class SearchService
  extends ElasticsearchService
  implements SearchServiceInterface<any>
{
  constructor() {
    super(ConfigSearch.searchConfig(ELASTIC_HOST));
  }

  public async insertIndex(bulkData: any): Promise<any> {
    const result = await this.bulk(bulkData);

    // if (result.statusCode) {
    //   console.error('fail on insertIndex', bulkData);
    //   throw new HttpException(
    //     result.errors.valueOf,
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }

    return result;
  }
  public async updateIndex(updateData: any): Promise<any> {
    try {
      const result = await this.update(updateData);
      return result;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  public async searchIndex(searchData: any): Promise<any> {
    try {
      const result = await this.search(searchData);
      //   const result = await this.search({
      //     index: 'customer',
      //     body: {
      //       query: {
      //         match: {
      //           name: 'teste',
      //         },
      //       },
      //     },
      //   });

      return result.body.hits.hits;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  public async deleteIndex(indexData: any): Promise<any> {
    try {
      const result = await this.indices.delete(indexData);
      return result;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  public async deleteDocument(indexData: any): Promise<any> {
    try {
      const result = await this.delete(indexData);
      return result;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
