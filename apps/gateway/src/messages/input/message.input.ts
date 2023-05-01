import { ConversationType } from '@app/core';
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class SendMessageInput {
  @Field(() => String)
  to: string;

  @Field(() => String)
  message: string;
}

@InputType()
export class CreateConversationInput {
  @Field(() => String)
  name: string;

  @Field(() => ConversationType)
  type: ConversationType;
}
