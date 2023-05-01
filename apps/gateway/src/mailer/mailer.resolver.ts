import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MailerService } from './mailer.service';
import { BooleanPayload } from '@app/core';
import { SendPinCodeInput } from './input';

@Resolver()
export class MailerResolver {
  constructor(@Inject(MailerService) private mailerService: MailerService) {}

  @Mutation(() => BooleanPayload)
  async sendEmailVerify(@Args('input') input: SendPinCodeInput) {
    const result = await this.mailerService.sendEmailVerify(input);
    return result;
  }
}
