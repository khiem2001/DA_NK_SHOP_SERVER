import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {
  AdminInputDto,
  GetPhoneInputDto,
  LoginSocialInputDto,
  LoginUserInputDto,
  RegisterUserInputDto,
  VerifyPhoneInputDto,
} from './input';
import { BooleanPayload } from '@app/core';
import {
  LoginResponse,
  RegisterUserResponse,
  VerifyPhoneResponse,
} from './type';
import { SmsService } from '../sms/sms.service';

@Resolver()
export class AuthResolver {
  constructor(
    @Inject(AuthService) private readonly _authService: AuthService,
    @Inject(SmsService) private readonly _smsService: SmsService,
  ) {}
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
  @Mutation(() => BooleanPayload)
  async createAdmin(@Args('input') input: AdminInputDto) {
    return this._authService.createAdmin(input);
  }

  @Mutation(() => RegisterUserResponse)
  async registerUser(@Args('input') input: RegisterUserInputDto) {
    const { phoneNumber, fullName } = await this._authService.registerUser(
      input,
    );
    const information = await this._smsService.sendOtp({
      phoneNumber,
    });
    return { fullName: fullName, ...information };
  }

  @Mutation(() => VerifyPhoneResponse)
  async verifyPhone(@Args('input') input: VerifyPhoneInputDto) {
    const { sessionId } = input;
    const { confirmed } = await this._smsService.confirmOtp(input);
    if (confirmed) {
      const { phoneNumber } = await this._smsService.getPhoneNumber({
        sessionId,
      });
      return await this._authService.verifyPhone({ phoneNumber });
    }
  }

  @Mutation(() => LoginResponse)
  async loginUser(@Args('input') input: LoginUserInputDto) {
    return await this._authService.loginUser(input);
  }

  @Mutation(() => LoginResponse)
  async loginSocial(@Args('input') input: LoginSocialInputDto) {
    return await this._authService.loginSocial(input);
  }
}
