import { AppMetadata, BooleanPayload, PipeThrowError } from '@app/core';
import {
  USERS_SERVICE_NAME,
  UpdateProfileRequest,
  UsersServiceClient,
} from '@app/proto-schema/proto/user.pb';
import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import {
  ChangePassWhenLoginType,
  UpdateProfileResponse,
  UserDtoType,
} from './type';
import { Media } from '../product/type';
import { IGraphQLContext } from '@app/core/interfaces';
import { AuthenticationGuard } from '../auth/guards';
import { catchError, firstValueFrom, timeout } from 'rxjs';
import {
  ChangePassWhenLoginInput,
  UpdateAvatarInput,
  UpdateProfileInputDto,
} from './input/user.input';

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

  @UseGuards(AuthenticationGuard)
  @Mutation(() => UpdateProfileResponse)
  async updateProfile(
    @Args('input') input: UpdateProfileInputDto,
    @Context() context: any,
  ) {
    const { _id } = context.req.user;
    const { email } = input;

    if (email) {
      const { user } = await firstValueFrom(
        this.userService.getUserByEmail({ email }),
      );
      if (user) {
        throw new RpcException(
          'Email đã được sử dụng. Vui lòng sử dụng email khác.',
        );
      }
    }

    return this.userService
      .updateProfile({
        userId: _id,
        ...input,
      } as unknown as UpdateProfileRequest)
      .pipe(timeout(5000), catchError(PipeThrowError));
  }
  @UseGuards(AuthenticationGuard)
  @Mutation(() => BooleanPayload)
  async updateAvatarUser(
    @Args('input') input: UpdateAvatarInput,
    @Context() context: any,
  ) {
    const { _id } = context.req.user;

    return this.userService.updateAvatarUser(
      input,
      this.metadata.setUserId(_id),
    );
  }

  @UseGuards(AuthenticationGuard)
  @Mutation(() => ChangePassWhenLoginType)
  async changePasswordWhenLogin(
    @Args('input') input: ChangePassWhenLoginInput,
    @Context() context: any,
  ) {
    const { _id } = context.req.user;

    return this.userService.changePasswordWhenLogin(
      input,
      this.metadata.setUserId(_id),
    );
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
