import { AppMetadata, CommentEntity, PubSubModule } from '@app/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentCommandHandlers } from './cqrs/commands';
import { CommentQueryHandlers } from './cqrs/query';

@Module({
  imports: [
    PubSubModule,
    TypeOrmModule.forFeature([CommentEntity, CommentRepository]),
  ],
  controllers: [CommentController],
  providers: [AppMetadata, ...CommentCommandHandlers, ...CommentQueryHandlers],
})
export class CommentModule {}
