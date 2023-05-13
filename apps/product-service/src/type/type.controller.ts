import { AppMetadata } from '@app/core';
import {
  ListTypeRequest,
  PRODUCT_SERVICE_NAME,
  ProductType,
} from '@app/proto-schema/proto/product.pb';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateTypeCommand } from './command';
import { ListTypeQuery } from './query/iml';

@Controller()
export class TypeController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly appMetadata: AppMetadata,
  ) {}
  @GrpcMethod(PRODUCT_SERVICE_NAME, 'CreateType')
  async createType(input: ProductType) {
    return await this.commandBus.execute(new CreateTypeCommand(input));
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'ListType')
  async listType(input: ListTypeRequest) {
    return await this.queryBus.execute(new ListTypeQuery(input));
  }
}
