import { GetListUserByIdsHandler } from './list-user-by-ids.handler';
import { ReadUserHandler } from './read-user.handler';
import { GetUserByPhoneHandler } from './user-by-phone.handler';

export const UsersQueryHandlers = [
  GetUserByPhoneHandler,
  ReadUserHandler,
  GetListUserByIdsHandler,
];
