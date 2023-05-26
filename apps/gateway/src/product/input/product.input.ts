import {
  PaginationBaseInput,
  PaymentMethod,
  PaymentProvider,
  PaymentType,
} from '@app/core';
import { OrderItem } from '@app/core/entities/cart';
import { Field, InputType } from '@nestjs/graphql';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

@InputType()
export class CreateProductInputDto {
  @Field(() => String)
  @IsNotEmpty({
    message: 'Vui lòng nhập tên sản phẩm',
  })
  name: string;

  @Field(() => String)
  @IsNotEmpty({
    message: 'Vui lòng nhập tên sản phẩm',
  })
  type: string;

  @Field(() => String)
  @IsNotEmpty({
    message: 'Vui lòng nhập mô tả sản phẩm',
  })
  description: string;

  @Field(() => Number)
  @IsNumber(
    {},
    {
      message: 'Dữ liệu không hợp lệ',
    },
  )
  @IsNotEmpty({
    message: 'Vui lòng nhập giá sản phẩm',
  })
  price: number;

  @Field(() => Number)
  @IsNumber(
    {},
    {
      message: 'Dữ liệu không hợp lệ',
    },
  )
  @IsNotEmpty({
    message: 'Vui lòng nhập giá sản phẩm',
  })
  countInStock: number;

  @Field(() => String)
  image: string;

  @Field(() => String)
  video: string;

  @Field(() => String)
  manufacturer: string;

  @Field(() => String)
  modelNumber: string;

  @Field(() => String)
  dimensions: string;

  @Field(() => String)
  weight: string;

  @Field(() => String)
  connectivity: string;

  @Field(() => String)
  powerSource: string;

  @Field(() => String)
  compatibility: string;

  @Field(() => String)
  warranty: string;
}

@InputType()
export class ReadProductInputDto {
  @Field(() => String)
  @IsNotEmpty({
    message: 'Vui lòng nhập id sản phẩm',
  })
  productId: string;
}

@InputType()
export class ReadManyProductInputDto {
  @Field(() => [String])
  @IsNotEmpty({
    message: 'Vui lòng nhập id sản phẩm',
  })
  ids: string[];
}

@InputType()
export class ProductInputDto {
  @Field(() => String)
  @IsNotEmpty({
    message: 'Vui lòng nhập tên sản phẩm',
  })
  name: string;

  @Field(() => String)
  @IsNotEmpty({
    message: 'Vui lòng nhập mô tả sản phẩm',
  })
  description: string;

  @Field(() => Number)
  @IsNumber(
    {},
    {
      message: 'Dữ liệu không hợp lệ',
    },
  )
  @IsNotEmpty({
    message: 'Vui lòng nhập giá sản phẩm',
  })
  price: number;

  @Field(() => Number)
  @IsNumber(
    {},
    {
      message: 'Dữ liệu không hợp lệ',
    },
  )
  @IsNotEmpty({
    message: 'Vui lòng nhập giá sản phẩm',
  })
  countInStock: number;

  @Field(() => String)
  image: string;

  @Field(() => String)
  video: string;

  @Field(() => String)
  manufacturer: string;

  @Field(() => String)
  modelNumber: string;

  @Field(() => String)
  dimensions: string;

  @Field(() => String)
  weight: string;

  @Field(() => String)
  connectivity: string;

  @Field(() => String)
  powerSource: string;

  @Field(() => String)
  compatibility: string;

  @Field(() => String)
  warranty: string;
}

@InputType()
export class FilterProductInput {
  @Field(() => Number, { nullable: true })
  price_lte: number;

  @Field(() => Number, { nullable: true })
  price_gte: number;

  @Field(() => String, { nullable: true })
  type_eq: string;
}

@InputType()
export class UpdateProductInputDto {
  @Field(() => String)
  @IsNotEmpty({
    message: 'Vui lòng nhập id sản phẩm',
  })
  productId: string;

  @Field(() => ProductInputDto)
  updateInput: ProductInputDto;
}

@InputType()
export class GetListProductInput {
  @Field(() => PaginationBaseInput)
  pagination: PaginationBaseInput;

  @Field(() => FilterProductInput, { nullable: true })
  filter: FilterProductInput;
}

@InputType()
export class CreatePaymentInputDto {
  @Field(() => String)
  @IsNotEmpty({
    message: 'Vui lòng nhập mã đơn hàng',
  })
  code: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  couponCode: string;

  @Field(() => [OrderItem])
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  items: OrderItem[];

  @Field(() => PaymentMethod)
  @IsNotEmpty({
    message: 'Vui lòng chọn phương thức thanh toán',
  })
  paymentMethod: PaymentMethod;

  @Field(() => PaymentType, { nullable: true })
  @IsOptional()
  paymentType: PaymentType;

  @Field(() => PaymentProvider, { nullable: true })
  @IsOptional()
  paymentProvider: PaymentProvider;

  @Field(() => String)
  @IsOptional()
  shippingAddress: string;
}
