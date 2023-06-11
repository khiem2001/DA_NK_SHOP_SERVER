import { DeleteUserRequest } from '@app/proto-schema/proto/user.pb';
import { ICommand } from '@nestjs/cqrs';

export class DeleteUserCommand implements ICommand {
  constructor(public readonly cmd: DeleteUserRequest) {}
}
