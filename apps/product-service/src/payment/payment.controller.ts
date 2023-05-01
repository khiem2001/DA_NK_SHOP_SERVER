import { AppMetadata } from '@app/core';
import {
  CreatePaymentRequest,
  CreatePaymentResponse,
  PRODUCT_SERVICE_NAME,
} from '@app/proto-schema/proto/product.pb';
import { Metadata } from '@grpc/grpc-js';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { CreatePaymentCommand } from './cqrs/command/iml';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ZaloPayService } from './zalopay.service';
import { Request, Response } from 'express';
import * as requestIp from 'request-ip';
import { VNPayService } from './vnpay.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly appMetadata: AppMetadata,
    private readonly _zaloPayService: ZaloPayService,
    private readonly _vnpayService: VNPayService,
  ) {}

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'CreatePayment')
  async createPayment(
    request: CreatePaymentRequest,
    metadata: Metadata,
  ): Promise<CreatePaymentResponse> {
    return await this.commandBus.execute(
      new CreatePaymentCommand(request, this.appMetadata.getUserId(metadata)),
    );
  }
  @Post('hook/zalo_url_ipn')
  async zaloUrlIpn(@Body() input: any, @Res() res: Response) {
    const { data, mac, type } = input;
    const { return_code, return_message } =
      await this._zaloPayService.callBackPaymentProcess({ data, mac, type });
    return res.status(200).json({ return_code, return_message });
  }

  @Get('hook/url_ipn')
  async urlIPN(@Req() req: Request, @Res() res: Response) {
    const ip = requestIp.getClientIp(req);
    const { RspCode, Message } =
      await this._vnpayService.callBackPaymentProcess(req.query);
    return res.status(200).json({ RspCode, Message });
  }
}
