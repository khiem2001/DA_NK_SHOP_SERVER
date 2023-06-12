import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MailerService } from './mailer.service';
import { BooleanPayload } from '@app/core';
import { SendPinCodeInput, VerifyEmailInput } from './input';
import { SendEmailResponse } from './type';

@Resolver()
export class MailerResolver {
  constructor(@Inject(MailerService) private mailerService: MailerService) {}

  @Mutation(() => SendEmailResponse)
  async sendEmail(@Args('input') input: SendPinCodeInput) {
    const result = await this.mailerService.sendEmail(input);
    return result;
  }

  @Mutation(() => BooleanPayload)
  async verifyEmail(@Args('input') input: VerifyEmailInput) {
    const result = await this.mailerService.verifyEmail(input);
    return result;
  }
}
