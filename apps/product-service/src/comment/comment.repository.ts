import { BaseRepository, CommentEntity } from '@app/core';
import { EntityRepository } from 'typeorm';

@EntityRepository(CommentEntity)
export class CommentRepository extends BaseRepository<CommentEntity> {}
