import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListCommentQuery } from '../impl';
import { CommentRepository } from '../../../comment.repository';
import { ListCommentResponse } from '@app/proto-schema/proto/product.pb';

@QueryHandler(ListCommentQuery)
export class ListCommentHandler implements IQueryHandler<ListCommentQuery> {
  constructor(private readonly _commentRepository: CommentRepository) {}
  async execute({ query }: ListCommentQuery): Promise<ListCommentResponse> {
    const data = await this._commentRepository
      .aggregate([
        {
          $match: {
            productId: query.id,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ])
      .toArray();

    return { data } as unknown as ListCommentResponse;
  }
}
