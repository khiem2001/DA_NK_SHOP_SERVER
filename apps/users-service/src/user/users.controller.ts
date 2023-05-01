import { AppMetadata } from '@app/core';
import {
  CreateAdminRequest,
  GetUserByPhoneNumberRequest,
  RegisterUserRequest,
  USERS_SERVICE_NAME,
  VerifyPhoneRequest,
  ReadUserRequest,
  LoginOrCreateAccountRequest,
  GetListUserByIdsRequest,
} from '@app/proto-schema/proto/user.pb';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateAdminCommand,
  LoginOrCreateCommand,
  RegisterUserCommand,
  VerifyPhoneCommand,
} from './cqrs/command';
import {
  GetListUserByIdsQuery,
  ReadUserQuery,
  UserByPhoneQuery,
} from './cqrs/query';

@Controller()
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly appMetadata: AppMetadata,
  ) {}

  @GrpcMethod(USERS_SERVICE_NAME, 'CreateAdmin')
  async createAdmin(input: CreateAdminRequest) {
    return await this.commandBus.execute(new CreateAdminCommand(input));
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'RegisterUser')
  async registerUser(input: RegisterUserRequest) {
    return await this.commandBus.execute(new RegisterUserCommand(input));
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'GetUserByPhoneNumber')
  async getUserByPhoneNumber(input: GetUserByPhoneNumberRequest) {
    return await this.queryBus.execute(new UserByPhoneQuery(input));
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'VerifyPhone')
  async verifyPhone(input: VerifyPhoneRequest) {
    return await this.commandBus.execute(new VerifyPhoneCommand(input));
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'ReadUser')
  async readUser(input: ReadUserRequest) {
    return await this.queryBus.execute(new ReadUserQuery(input));
  }
  @GrpcMethod(USERS_SERVICE_NAME, 'LoginOrCreateAccount')
  async loginOrCreateAccount(input: LoginOrCreateAccountRequest) {
    return await this.commandBus.execute(new LoginOrCreateCommand(input));
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'GetListUserByIds')
  async getListUserByIds(input: GetListUserByIdsRequest) {
    return await this.queryBus.execute(new GetListUserByIdsQuery(input));
  }
}
