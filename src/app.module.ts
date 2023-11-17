import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ObserverModule } from './commom/observers/observer.module';
import { SearchModule } from './search/search.module';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { PasswordResetModule } from './password-reset/password-reset.module';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200/',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'auth',
      username: 'root',
      password: '123456',
      entities: [join(__dirname, '**/*entity.{ts,js}')],
      synchronize: true,
      subscribers: ['dist/observers/subscribers/*.subscriber.js'],
    }),
    UsersModule,
    AuthModule,
    SearchModule,
    ObserverModule,
    PasswordResetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
