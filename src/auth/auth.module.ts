import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { SearchService } from '../search/search.service';

@Module({
  imports: [UsersModule, PassportModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    LocalStrategy,
    SessionSerializer,
    {
      provide: 'SearchServiceInterface',
      useClass: SearchService,
    },
  ],
})
export class AuthModule {}
