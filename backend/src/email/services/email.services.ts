import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailDto } from '../dtos/email.dto';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(email: EmailDto): Promise<any> {
    await this.mailerService.sendMail({
      to: email.to,
      subject: email.subject,
      text: email.message,
    });
  }
}
