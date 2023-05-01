import {
  MAILER_SERVICE_NAME,
  MailerServiceClient,
  SendEmailVerifyRequest,
  SendEmailVerifyResponse,
} from '@app/proto-schema/proto/mailer.pb';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MailerService {
  private mailerService: MailerServiceClient;

  constructor(
    @Inject(MAILER_SERVICE_NAME) private readonly mailerClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.mailerService =
      this.mailerClient.getService<MailerServiceClient>(MAILER_SERVICE_NAME);
  }

  async sendEmailVerify({
    email,
    pinCode,
  }: SendEmailVerifyRequest): Promise<SendEmailVerifyResponse> {
    return await firstValueFrom(
      this.mailerService.sendEmailVerify({ email, pinCode }),
    );
  }
}
