import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../impl';
import { UserRepository } from '../../../users.repository';
import { RpcException } from '@nestjs/microservices';
import { UserEntity } from '@app/core';
import { hashPassword } from '@app/utils';
import { DeleteUserResponse } from '@app/proto-schema/proto/user.pb';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: DeleteUserCommand): Promise<DeleteUserResponse> {
    const { cmd } = command;
    const user = await this.userRepository.findById(cmd.id);
    if (!user) {
      throw new RpcException('Ngườii dùng không tồn tại !');
    }
    await this.userRepository.softDeleteById(cmd.id);
    return { success: true };
  }
}
