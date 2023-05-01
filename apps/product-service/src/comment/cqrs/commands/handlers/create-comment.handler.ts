import { CommentEntity } from '@app/core';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommentRepository } from '../../../comment.repository';
import { CreateCommentCommand } from '../impl';
import { CreateCommentResponse } from '@app/proto-schema/proto/product.pb';

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler
  implements ICommandHandler<CreateCommentCommand>
{
  constructor(private readonly _commentRepository: CommentRepository) {}

  async execute({
    cmd,
    userId: inputUserId,
  }: CreateCommentCommand): Promise<CreateCommentResponse> {
    const { ...input } = cmd;
    const { _id, message, productId, parentId, userId } =
      await this._commentRepository.save(
        new CommentEntity({
          ...input,
          userId: inputUserId,
        }),
      );

    return { _id, message, productId, parentId, userId };
  }
}
