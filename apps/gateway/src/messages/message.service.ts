import { AppMetadata } from '@app/core';
import {
  CreateConversationResponse,
  MESSAGE_SERVICE_NAME,
  MessageServiceClient,
} from '@app/proto-schema/proto/message.pb';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateConversationInput } from './input';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MessageService {
  private _messageService: MessageServiceClient;

  constructor(
    @Inject(MESSAGE_SERVICE_NAME) private readonly _messageClient: ClientGrpc,
    private readonly metadata: AppMetadata,
  ) {
    this._messageService =
      this._messageClient.getService<MessageServiceClient>(
        MESSAGE_SERVICE_NAME,
      );
  }

  async createConversation(
    input: CreateConversationInput,
    userId: string,
  ): Promise<CreateConversationResponse> {
    const { conversation } = await firstValueFrom(
      this._messageService.createConversation(
        input,
        this.metadata.setUserId(userId),
      ),
    );
    return { conversation };
  }

  // findAll() {}

  // findOne(id: string) {}

  // remove(id: string) {}

  // identify(name: string, clientId: string) {
  //   return;
  // }
  // getClientName(clientId) {
  //   return;
  // }
}
