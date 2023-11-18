import { Injectable } from '@nestjs/common';
import { CreatePasswordResetDto } from './dto/create-password-reset.dto';
import { UpdatePasswordResetDto } from './dto/update-password-reset.dto';
import { UsersService } from '../users/users.service';
import { PasswordReset } from './entities/password-reset.entity';
import { randomUUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailService } from '../commom/mail/mail.service';
import { PasswordResetDto } from './dto/password-reset.dto';

@Injectable()
export class PasswordResetService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(PasswordReset)
    private passwordResetRepository: Repository<PasswordReset>,
    private mail: MailService,
  ) {}

  async create(createPasswordResetDto: CreatePasswordResetDto): Promise<void> {
    const user = await this.usersService.findUserByEmail(
      createPasswordResetDto.email,
    );

    if (!user) return;

    const passwordReset = new PasswordReset();
    passwordReset.email = user.email;
    passwordReset.token = randomUUID();

    await this.passwordResetRepository.save(passwordReset);
    await this.mail.sendResetPasswrodEmail(passwordReset);
  }

  async resetPassword(passwordResetDto: PasswordResetDto) {
    const passwordReset = await this.passwordResetRepository.findOneBy({
      token: passwordResetDto.token,
    });

    if (!passwordReset) return;

    const user = await this.usersService.findUserByEmail(passwordReset.email);
    if (!user) return;

    await user.setPassword(passwordResetDto.password);
    await this.usersService.updateUser(user);
    await this.passwordResetRepository.delete(passwordReset.id);
  }

  findAll() {
    return `This action returns all passwordReset`;
  }

  findOne(id: number) {
    return `This action returns a #${id} passwordReset`;
  }

  update(id: number, updatePasswordResetDto: UpdatePasswordResetDto) {
    return `This action updates a #${id} passwordReset`;
  }

  remove(id: number) {
    return `This action removes a #${id} passwordReset`;
  }
}
