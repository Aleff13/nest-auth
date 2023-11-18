import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetController } from './password-reset.controller';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordReset } from './entities/password-reset.entity';
import { User } from '../users/entities/user.entity';
import { MailService } from '../commom/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordReset, User])],
  controllers: [PasswordResetController],
  providers: [PasswordResetService, UsersService, MailService],
})
export class PasswordResetModule {}
