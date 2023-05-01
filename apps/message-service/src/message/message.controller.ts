import { AppMetadata } from '@app/core';
import {
  CreateConversationRequest,
  MESSAGE_SERVICE_NAME,
  SendJoinGroupRequest,
  SendMessageRequest,
} from '@app/proto-schema/proto/message.pb';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateConversationCommand,
  SendJoinGroupCommand,
  SendMessageCommand,
} from './cqrs/command';
import { Metadata } from '@grpc/grpc-js';

@Controller()
export class MessageController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly appMetadata: AppMetadata,
  ) {}

  @GrpcMethod(MESSAGE_SERVICE_NAME, 'CreateConversation')
  async createConversation(
    input: CreateConversationRequest,
    metadata: Metadata,
  ) {
    return await this.commandBus.execute(
      new CreateConversationCommand(
        input,
        this.appMetadata.getUserId(metadata),
      ),
    );
  }

  @GrpcMethod(MESSAGE_SERVICE_NAME, 'SendMessage')
  async sendMessage(input: SendMessageRequest, metadata: Metadata) {
    return await this.commandBus.execute(
      new SendMessageCommand(input, this.appMetadata.getUserId(metadata)),
    );
  }

  @GrpcMethod(MESSAGE_SERVICE_NAME, 'SendJoinGroup')
  async sendJoinGroup(input: SendJoinGroupRequest, metadata: Metadata) {
    return await this.commandBus.execute(
      new SendJoinGroupCommand(input, this.appMetadata.getUserId(metadata)),
    );
  }
}
