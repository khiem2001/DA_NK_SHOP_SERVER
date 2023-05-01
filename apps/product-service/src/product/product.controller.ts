import { AppMetadata } from '@app/core';
import {
  CreateProductRequest,
  DeleteProductRequest,
  GetListProductRequest,
  GetProductRequest,
  PRODUCT_SERVICE_NAME,
  UpdateProductRequest,
} from '@app/proto-schema/proto/product.pb';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateProductCommand,
  DeleteProductCommand,
  UpdateProductCommand,
} from './cqrs/command';
import { GetListProductQuery, GetProductQuery } from './cqrs/query';

@Controller()
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly appMetadata: AppMetadata,
  ) {}

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'CreateProduct')
  async createProduct(input: CreateProductRequest) {
    return await this.commandBus.execute(new CreateProductCommand(input));
  }
  @GrpcMethod(PRODUCT_SERVICE_NAME, 'UpdateProduct')
  async updateProduct(input: UpdateProductRequest) {
    return await this.commandBus.execute(new UpdateProductCommand(input));
  }
  @GrpcMethod(PRODUCT_SERVICE_NAME, 'DeleteProduct')
  async deleteProduct(input: DeleteProductRequest) {
    return await this.commandBus.execute(new DeleteProductCommand(input));
  }
  @GrpcMethod(PRODUCT_SERVICE_NAME, 'GetProduct')
  async getProduct(input: GetProductRequest) {
    return await this.queryBus.execute(new GetProductQuery(input));
  }
  @GrpcMethod(PRODUCT_SERVICE_NAME, 'GetListProduct')
  async getListProduct(input: GetListProductRequest) {
    return await this.queryBus.execute(new GetListProductQuery(input));
  }
}
