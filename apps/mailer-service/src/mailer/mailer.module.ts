import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MAIL_QUEUE } from '../constants/mail.constant';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';
import { MailProcessor } from './mailer.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: MAIL_QUEUE,
    }),
  ],
  controllers: [MailerController],
  providers: [MailerService, MailProcessor],
})
export class MailModule {}
