import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  @IsNotEmpty({
    message: 'Vui lòng nhập tin nhắn.',
  })
  message: string;

  @Field(() => String)
  @IsNotEmpty({
    message: 'Vui lòng chọn sự kiện.',
  })
  @IsObjectId({
    message: 'ID không đúng định dạng',
  })
  productId: string;

  @Field(() => String, { nullable: true })
  parentId: string;
}
