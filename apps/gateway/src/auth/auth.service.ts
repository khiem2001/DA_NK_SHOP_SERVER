import {
  CreateAdminRequest,
  LoginOrCreateAccountRequest,
  USERS_SERVICE_NAME,
  User,
  UsersServiceClient,
  VerifyPhoneRequest,
} from '@app/proto-schema/proto/user.pb';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  AdminInputDto,
  GetPhoneInputDto,
  LoginSocialInputDto,
  LoginUserInputDto,
  RegisterUserInputDto,
} from './input';
import { firstValueFrom } from 'rxjs';
import { comparePassword } from '@app/utils';
import { JwtService } from '@nestjs/jwt';
import { JWT_COMMON } from './constants';
import * as moment from 'moment';
import * as ms from 'ms';
import { LoginResponse } from './type';

@Injectable()
export class AuthService {
  private userService: UsersServiceClient;

  constructor(
    @Inject(USERS_SERVICE_NAME) private readonly usersClient: ClientGrpc,
    private readonly jwtService: JwtService,
  ) {
    this.userService =
      usersClient.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }
  /**
   * create Admin function
   * @param input
   * @returns
   */
  createAdmin(input: AdminInputDto) {
    return this.userService.createAdmin(input as unknown as CreateAdminRequest);
  }

  /**
   * Regis function
   * @param input
   * @returns
   */
  async registerUser(input: RegisterUserInputDto) {
    const { _id, fullName, phoneNumber } = await firstValueFrom(
      this.userService.registerUser(input),
    );
    return {
      _id,
      fullName,
      phoneNumber,
    };
  }

  /**
   * Verify phone number
   * @param input
   * @returns
   */
  async verifyPhone(input: GetPhoneInputDto) {
    return await firstValueFrom(
      this.userService.verifyPhone(input as VerifyPhoneRequest),
    );
  }

  /**
   * Login function
   * @param input
   * @returns
   */
  async loginUser(input: LoginUserInputDto) {
    const { phoneNumber, password } = input;
    const { user } = await firstValueFrom(
      this.userService.getUserByPhoneNumber({ phoneNumber }),
    );
    if (this._userCanLogin(user)) {
      if (await comparePassword(password, user.password)) {
        const { token, refreshToken, expiresAt, refreshTokenExpiresAt } =
          await this.tradeTokenProcess(user);

        return {
          token,
          refreshToken,
          expiresAt,
          refreshTokenExpiresAt,
          payload: user as any,
        };
      }
      throw new NotFoundException('Mật khẩu không chính xác !');
    }
  }

  /**
   * Check user can login
   * @param user
   * @returns
   */
  _userCanLogin(user: User) {
    if (!user.active) {
      throw new NotFoundException(
        'Tài khoản không hoạt động. Vui lòng liên hệ quản trị viên !',
      );
    }
    return true;
  }
  /**
   * Trade token
   * @param user
   * @returns
   */
  async tradeTokenProcess(user: User) {
    const token = await this.generateToken(user, 'accessToken');
    const refreshToken = await this.generateToken(user, 'refreshToken');
    return {
      token,
      refreshToken,
      expiresAt: moment()
        .add(ms(JWT_COMMON['accessToken'].signOptions.expiresIn) / 1000, 's')
        .toDate(),
      refreshTokenExpiresAt: moment()
        .add(ms(JWT_COMMON['refreshToken'].signOptions.expiresIn) / 1000, 's')
        .toDate(),
    };
  }
  /**
   * This function to generate token
   * @param user
   * @param type
   * @returns
   */
  async generateToken({ email, fullName, _id }: User, type: string) {
    const payload =
      type !== 'refreshToken' ? { email, fullName, uid: _id } : { uid: _id };
    console.log();
    return await this.jwtService.sign(payload, {
      secret: `${JWT_COMMON[type].privateKey}`,
      algorithm: 'HS256',
      expiresIn: `${JWT_COMMON[type].signOptions.expiresIn}`,
    });
  }

  /**
   * This is function to loginSocial
   * @param input
   * @returns
   */
  async loginSocial({
    accessToken,
    provider,
  }: LoginSocialInputDto): Promise<LoginResponse> {
    const { user } = await firstValueFrom(
      this.userService.loginOrCreateAccount({
        accessToken,
        provider,
      } as LoginOrCreateAccountRequest),
    );
    const { token, refreshToken, expiresAt, refreshTokenExpiresAt } =
      await this.tradeTokenProcess(user);

    return {
      token,
      refreshToken,
      expiresAt,
      refreshTokenExpiresAt,
      payload: user as any,
    };
  }
}
