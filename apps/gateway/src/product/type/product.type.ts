import { PaginationResponse } from '@app/core';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductPayload {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  price: number;

  @Field({ nullable: true })
  countInStock: number;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  video: string;

  @Field({ nullable: true })
  manufacturer: string;

  @Field({ nullable: true })
  modelNumber: string;

  @Field({ nullable: true })
  dimensions: string;

  @Field({ nullable: true })
  weight: string;

  @Field({ nullable: true })
  connectivity: string;

  @Field({ nullable: true })
  powerSource: string;

  @Field({ nullable: true })
  compatibility: string;

  @Field({ nullable: true })
  warranty: string;

  @Field({ nullable: true })
  total_like: string;

  @Field({ nullable: true })
  total_comment: string;
}

@ObjectType()
export class GetProductResponse {
  @Field(() => ProductPayload, { nullable: true })
  product: ProductPayload;
}

@ObjectType()
export class GetListProductResponse {
  @Field(() => [ProductPayload], { nullable: true })
  product: ProductPayload[];

  @Field(() => Number, { nullable: true })
  totalNumber: number;

  @Field(() => PaginationResponse, { nullable: true })
  pagination: PaginationResponse;
}

@ObjectType()
export class CreatePaymentResponse {
  @Field({ nullable: true })
  redirectUrl?: string;

  @Field(() => Boolean, { nullable: true })
  success?: boolean;
}
