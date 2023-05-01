/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'mailer';

export interface SendEmailVerifyRequest {
  email: string;
  pinCode: string;
}

export interface SendEmailVerifyResponse {
  success: boolean;
}

export const MAILER_PACKAGE_NAME = 'mailer';

export interface MailerServiceClient {
  sendEmailVerify(
    request: SendEmailVerifyRequest,
    metadata?: Metadata,
  ): Observable<SendEmailVerifyResponse>;
}

export interface MailerServiceController {
  sendEmailVerify(
    request: SendEmailVerifyRequest,
    metadata?: Metadata,
  ):
    | Promise<SendEmailVerifyResponse>
    | Observable<SendEmailVerifyResponse>
    | SendEmailVerifyResponse;
}

export function MailerServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['sendEmailVerify'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('MailerService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('MailerService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const MAILER_SERVICE_NAME = 'MailerService';

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
