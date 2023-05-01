import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@Processor('message')
export class MessageProcessor {
  constructor(private readonly server: Server) {}

  private readonly logger = new Logger(MessageProcessor.name);

  @Process('sendMessage')
  async sendMessageJob(
    job: Job<{ to: string; from: string; message: string }>,
  ) {
    const { to, from, message } = job.data;
    this.server.to(to).emit('message', { from: from, message: message });
  }
}
