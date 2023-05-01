import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PRODUCT_PACKAGE_NAME } from '../proto/product.pb';

export const productClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: PRODUCT_PACKAGE_NAME,
    protoPath: join(`${process.cwd()}/proto/product.proto`),
    url: 'localhost:50055',
    loader: {
      keepCase: true,
      longs: String,
      enums: String,
      oneofs: true,
    },
  },
};
