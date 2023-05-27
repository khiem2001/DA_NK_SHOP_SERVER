import { GetAdminByUserNameHandler } from './get-admin-by-username.handler';
import { GetListUserByIdsHandler } from './list-user-by-ids.handler';
import { ReadUserHandler } from './read-user.handler';
import { GetUserByEmailHandler } from './user-by-email.handler';
import { GetUserByPhoneHandler } from './user-by-phone.handler';

export const UsersQueryHandlers = [
  GetUserByPhoneHandler,
  ReadUserHandler,
  GetListUserByIdsHandler,
  GetUserByEmailHandler,
  GetAdminByUserNameHandler,
];
