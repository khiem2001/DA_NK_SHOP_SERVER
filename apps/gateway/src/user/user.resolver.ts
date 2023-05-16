import { AppMetadata } from '@app/core';
import {
  USERS_SERVICE_NAME,
  UsersServiceClient,
} from '@app/proto-schema/proto/user.pb';
import { Inject } from '@nestjs/common';
import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import { UserDtoType } from './type';
import { Media } from '../product/type';
import { IGraphQLContext } from '@app/core/interfaces';

@Resolver()
export class UserResolver {
  private userService: UsersServiceClient;
  constructor(
    @Inject(USERS_SERVICE_NAME) private readonly userClient: ClientGrpc,
    private readonly metadata: AppMetadata,
  ) {}
  onModuleInit() {
    this.userService =
      this.userClient.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }
}

@Resolver(() => UserDtoType)
export class UsersLoaderResolver {
  @ResolveField('avatarId', () => Media, { nullable: true })
  async avatar(
    @Parent() user: UserDtoType,
    @Context() { loaders }: IGraphQLContext,
  ) {
    if (user?.avatarId) {
      return loaders.mediaLoader.load(user?.avatarId);
    }
    return null;
  }
}
