import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { PasswordReset } from '../../password-reset/entities/password-reset.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendResetPasswrodEmail(passwrodReset: PasswordReset) {
    await this.mailerService.sendMail({
      to: passwrodReset.email,
      from: 'Nest auth<teste@teste.com>',
      subject: 'Password reset',
      template: 'reset-pass',
      context: {
        link: `http://localhost:3000/confirm?token=${passwrodReset.token}`,
      },
    });
  }
}
