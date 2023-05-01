import { Controller } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  MAILER_SERVICE_NAME,
  SendEmailVerifyRequest,
} from '@app/proto-schema/proto/mailer.pb';
import { Metadata } from '@grpc/grpc-js';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @GrpcMethod(MAILER_SERVICE_NAME, 'SendEmailVerify')
  sendEmailVerify(request: SendEmailVerifyRequest, metadata: Metadata) {
    return this.mailerService.sendEmailVerify(request);
  }
}
