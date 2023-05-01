import { Inject, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import {
  CreatePaymentResponse,
  GetListProductResponse,
  GetProductResponse,
} from './type';
import {
  CreatePaymentInputDto,
  CreateProductInputDto,
  GetListProductInput,
  ReadProductInputDto,
  UpdateProductInputDto,
} from './input';
import { BooleanPayload } from '@app/core';
import { AuthenticationGuard } from '../auth/guards';

export class ProductResolver {
  constructor(
    @Inject(ProductService) private readonly _productService: ProductService,
  ) {}

  @Query(() => GetProductResponse)
  async getProduct(@Args('input') input: ReadProductInputDto) {
    return await this._productService.getProduct(input);
  }

  @Query(() => GetListProductResponse)
  async getListProduct(@Args('input') input: GetListProductInput) {
    return await this._productService.getListProduct(input);
  }

  @Mutation(() => BooleanPayload)
  async createProduct(@Args('input') input: CreateProductInputDto) {
    return await this._productService.createProduct(input);
  }

  @Mutation(() => BooleanPayload)
  async updateProduct(@Args('input') input: UpdateProductInputDto) {
    return await this._productService.updateProduct(input);
  }

  @Mutation(() => BooleanPayload)
  async deleteProduct(@Args('input') input: ReadProductInputDto) {
    return await this._productService.deleteProduct(input);
  }

  @Mutation(() => CreatePaymentResponse)
  @UseGuards(AuthenticationGuard)
  async createPayment(
    @Args('input') input: CreatePaymentInputDto,
    @Context() context: any,
  ) {
    const { _id } = context.req.user;

    return await this._productService.createPayment(input, _id);
  }
}
