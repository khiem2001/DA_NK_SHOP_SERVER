import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from './message.controller';
import { MessageCommandHandlers } from './cqrs/command';
import {
  AppMetadata,
  ConfirmConversationEntity,
  ConversationEntity,
  MessageEntity,
} from '@app/core';
import {
  ConfirmConversationRepository,
  ConversationRepository,
  MessageRepository,
} from './message.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MessageEntity,
      MessageRepository,
      ConversationEntity,
      ConversationRepository,
      ConfirmConversationEntity,
      ConfirmConversationRepository,
    ]),
  ],
  controllers: [MessageController],
  providers: [...MessageCommandHandlers, AppMetadata],
})
export class MessageModule {}
