import { ConfigService } from '@nestjs/config';

export const config = new ConfigService();
export const JWT_COMMON = {
  accessToken: {
    privateKey: config.get<string>('JWT_SECRET'),
    signOptions: {
      expiresIn: config.get<string>('ACCESS_TOKEN_EXPIRES_IN'),
    },
  },
  refreshToken: {
    privateKey: config.get('NKSHOP-REFRESH'),
    signOptions: {
      expiresIn: config.get('REFRESH_TOKEN_EXPIRES_IN'),
    },
  },
};
