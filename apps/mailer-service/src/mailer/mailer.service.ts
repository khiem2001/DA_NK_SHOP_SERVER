import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { MAIL_QUEUE, VERIFY_EMAIL } from '../constants';
import { Queue } from 'bull';
import { ConfigService } from '@nestjs/config';
import {
  SendEmailVerifyRequest,
  SendEmailVerifyResponse,
} from '@app/proto-schema/proto/mailer.pb';

@Injectable()
export class MailerService {
  private readonly _logger = new Logger(MailerService.name);
  constructor(
    @InjectQueue(MAIL_QUEUE) private readonly _mailQueue: Queue,
    private readonly _configService: ConfigService,
  ) {}

  public async sendEmailVerify({
    email,
    pinCode,
  }: SendEmailVerifyRequest): Promise<SendEmailVerifyResponse> {
    const data = {
      to: email,
      from: this._configService.get('MAILDEV_INCOMING_USER'),
      subject: 'Welcome to NK-SHOP! Verify your Email',
      template: 'verify-email',
      context: { code: pinCode },
    };
    this._mailQueue.add(VERIFY_EMAIL, {
      ...data,
    });
    return {
      success: true,
    };
  }
}
