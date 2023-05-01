import { CreateAdminHandler } from './create-admin.handler';
import { LoginOrCreateHandler } from './login-or-create.handler';
import { RegisterUserHandler } from './register-user.handler';
import { VerifyPhoneHandler } from './verify-phone.handler';
export const UsersCommandHandlers = [
  CreateAdminHandler,
  RegisterUserHandler,
  VerifyPhoneHandler,
  LoginOrCreateHandler,
];
