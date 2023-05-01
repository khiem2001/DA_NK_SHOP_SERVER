import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentResponse {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  message: string;

  @Field(() => String, { nullable: true, name: 'user' })
  userId: string;

  @Field(() => String, { nullable: true })
  parentId?: string;

  @Field(() => String, { nullable: true })
  productId?: string;
}
