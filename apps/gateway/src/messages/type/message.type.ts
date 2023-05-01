import { ConversationType } from '@app/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class ConversationDtoType {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  name: string;

  @Field(() => [String])
  members: string[];

  @Field(() => String, { nullable: true })
  ownerId: string;

  @Field(() => ConversationType)
  type: ConversationType;

  @Field(() => Number, { nullable: true })
  createdAt: number;

  @Field(() => String, { nullable: true })
  createdBy: string;

  @Field(() => Number, { nullable: true })
  updatedAt: number;

  @Field(() => String, { nullable: true })
  updatedBy: string;

  @Field(() => String, { nullable: true })
  deletedBy: string;

  @Field(() => Number, { nullable: true })
  deletedAt: number;
}

@ObjectType()
export class CreateConversationType {
  @Field(() => ConversationDtoType)
  conversation: ConversationDtoType;
}
