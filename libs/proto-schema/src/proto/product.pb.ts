/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';
import { PaginationInput, PaginationResponse } from './base.pb';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'product';

export enum PaymentMethod {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export enum PaymentType {
  ATM = 'ATM',
  CC = 'CC',
}

export enum PaymentProvider {
  ZALOPAY = 'ZALOPAY',
  VNPAY = 'VNPAY',
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  countInStock: number;
  image: string;
  video: string;
  manufacturer: string;
  modelNumber: string;
  dimensions: string;
  weight: string;
  connectivity: string;
  powerSource: string;
  compatibility: string;
  warranty: string;
}

export interface CreateProductResponse {
  success: boolean;
}

export interface GetProductRequest {
  productId: string;
}

export interface GetProductResponse {
  product: Product | undefined;
}

export interface GetListProductRequest {
  filter: GetListProductRequest_Filter | undefined;
  pagination: PaginationInput | undefined;
}

export interface GetListProductRequest_Filter {
  price_eq: number;
  manufacturer_eq: string;
  weight_eq: string;
  connectivity_eq: string;
  powerSource_eq: string;
  warranty_eq: string;
}

export interface GetListProductResponse {
  products: Product[];
  pagination: PaginationResponse | undefined;
  totalItem: number;
}

export interface UpdateProductRequest {
  updateInput: ProductRequest | undefined;
  productId: string;
}

export interface UpdateProductResponse {
  success: boolean;
}

export interface DeleteProductRequest {
  productId: string;
}

export interface DeleteProductResponse {
  success: boolean;
}

export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  countInStock: number;
  image: string;
  video: string;
  manufacturer: string;
  modelNumber: string;
  dimensions: string;
  weight: string;
  connectivity: string;
  powerSource: string;
  compatibility: string;
  warranty: string;
}

export interface Product {
  name: string;
  description: string;
  price: number;
  countInStock: number;
  image: string;
  video: string;
  manufacturer: string;
  modelNumber: string;
  dimensions: string;
  weight: string;
  connectivity: string;
  powerSource: string;
  compatibility: string;
  warranty: string;
  total_like: number;
  total_comment: number;
  _id: string;
  /** base */
  createdAt: number;
  createdBy: number;
  updatedAt: number;
  updatedBy: number;
  deletedBy: string;
  deletedAt: number;
}

/** Payment */
export interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface CreatePaymentRequest {
  code: string;
  description: string;
  couponCode: string;
  items: OrderItem[];
  paymentMethod: PaymentMethod;
  paymentType: PaymentType;
  paymentProvider: PaymentProvider;
  shippingAddress: string;
}

export interface CreatePaymentResponse {
  redirectUrl?: string | undefined;
  success?: boolean | undefined;
}

export interface CreateCommentRequest {
  message: string;
  productId: string;
  parentId: string;
}

export interface CreateCommentResponse {
  message: string;
  productId: string;
  parentId: string;
  _id: string;
  userId: string;
}

export const PRODUCT_PACKAGE_NAME = 'product';

export interface ProductServiceClient {
  /** product */

  createProduct(
    request: CreateProductRequest,
    metadata?: Metadata,
  ): Observable<CreateProductResponse>;

  getProduct(
    request: GetProductRequest,
    metadata?: Metadata,
  ): Observable<GetProductResponse>;

  getListProduct(
    request: GetListProductRequest,
    metadata?: Metadata,
  ): Observable<GetListProductResponse>;

  updateProduct(
    request: UpdateProductRequest,
    metadata?: Metadata,
  ): Observable<UpdateProductResponse>;

  deleteProduct(
    request: DeleteProductRequest,
    metadata?: Metadata,
  ): Observable<DeleteProductResponse>;

  /** payment */

  createPayment(
    request: CreatePaymentRequest,
    metadata?: Metadata,
  ): Observable<CreatePaymentResponse>;

  /** Comment */

  createComment(
    request: CreateCommentRequest,
    metadata?: Metadata,
  ): Observable<CreateCommentResponse>;
}

export interface ProductServiceController {
  /** product */

  createProduct(
    request: CreateProductRequest,
    metadata?: Metadata,
  ):
    | Promise<CreateProductResponse>
    | Observable<CreateProductResponse>
    | CreateProductResponse;

  getProduct(
    request: GetProductRequest,
    metadata?: Metadata,
  ):
    | Promise<GetProductResponse>
    | Observable<GetProductResponse>
    | GetProductResponse;

  getListProduct(
    request: GetListProductRequest,
    metadata?: Metadata,
  ):
    | Promise<GetListProductResponse>
    | Observable<GetListProductResponse>
    | GetListProductResponse;

  updateProduct(
    request: UpdateProductRequest,
    metadata?: Metadata,
  ):
    | Promise<UpdateProductResponse>
    | Observable<UpdateProductResponse>
    | UpdateProductResponse;

  deleteProduct(
    request: DeleteProductRequest,
    metadata?: Metadata,
  ):
    | Promise<DeleteProductResponse>
    | Observable<DeleteProductResponse>
    | DeleteProductResponse;

  /** payment */

  createPayment(
    request: CreatePaymentRequest,
    metadata?: Metadata,
  ):
    | Promise<CreatePaymentResponse>
    | Observable<CreatePaymentResponse>
    | CreatePaymentResponse;

  /** Comment */

  createComment(
    request: CreateCommentRequest,
    metadata?: Metadata,
  ):
    | Promise<CreateCommentResponse>
    | Observable<CreateCommentResponse>
    | CreateCommentResponse;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createProduct',
      'getProduct',
      'getListProduct',
      'updateProduct',
      'deleteProduct',
      'createPayment',
      'createComment',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('ProductService', method)(
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
      GrpcStreamMethod('ProductService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const PRODUCT_SERVICE_NAME = 'ProductService';

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
