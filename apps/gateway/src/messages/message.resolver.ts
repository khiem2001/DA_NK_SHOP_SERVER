import { Inject, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { CreateConversationInput, SendMessageInput } from './input';
import { CreateConversationType } from './type/message.type';
import { AuthenticationGuard } from '../auth/guards';

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
}
