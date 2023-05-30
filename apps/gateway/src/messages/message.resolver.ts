import { Inject, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import {
  Args,
  Context,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import {
  CreateConversationInput,
  ListConversationInput,
  SendMessageInput,
} from './input';
import {
  ConversationDtoType,
  CreateConversationType,
  ListConversationResponse,
} from './type/message.type';
import { AuthenticationGuard } from '../auth/guards';
import { UserDtoType } from '../user/type';
import { IGraphQLContext } from '@app/core/interfaces';

@Resolver()
export class MessageResolver {
  constructor(
    @Inject(MessageService) private readonly _messageService: MessageService,
  ) {}

  // @Mutation()
  // // () => SendMessageType
  // async sendMessage(@Args('input') input: SendMessageInput) {
  //   await this._messageGateway.server
  //     .to(input.to)
  //     .emit('chat', { from: 'me', message: input.message });
  // }

  @Mutation(() => CreateConversationType)
  @UseGuards(AuthenticationGuard)
  async createConversation(
    @Args('input') input: CreateConversationInput,
    @Context() context: any,
  ) {
    const { _id: userId } = context.req.user;

    return await this._messageService.createConversation(input, userId);
  }

  @Query(() => ListConversationResponse)
  async listConversation(@Args('input') input: ListConversationInput) {
    return await this._messageService.listConversation(input);
  }
}
@Resolver(() => ConversationDtoType)
export class UserLoaderResolver {
  @ResolveField('members', () => [UserDtoType], { nullable: 'itemsAndList' })
  async user(
    @Parent() conversation: ConversationDtoType,
    @Context() { loaders }: IGraphQLContext,
  ) {
    if (conversation?.members) {
      return loaders.usersLoader.loadMany(conversation?.members);
    }
    return null;
  }
}
