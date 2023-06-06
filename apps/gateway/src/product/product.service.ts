import {
  CreatePaymentRequest,
  CreateProductRequest,
  CreateProductResponse,
  DeleteProductRequest,
  DeleteProductResponse,
  GetListProductRequest,
  GetListProductResponse,
  GetProductRequest,
  GetProductResponse,
  ListOrderResponse,
  PRODUCT_SERVICE_NAME,
  ProductServiceClient,
  UpdateProductRequest,
  UpdateProductResponse,
} from '@app/proto-schema/proto/product.pb';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreatePaymentInputDto,
  CreateProductInputDto,
  GetListProductInput,
  ReadProductInputDto,
  UpdateProductInputDto,
} from './input';
import { firstValueFrom } from 'rxjs';
import { AppMetadata, BooleanPayload } from '@app/core';

@Injectable()
export class ProductService {
  private productService: ProductServiceClient;
  constructor(
    @Inject(PRODUCT_SERVICE_NAME) private readonly productClient: ClientGrpc,
    private readonly metadata: AppMetadata,
  ) {
    this.productService =
      productClient.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  /**
   * get Product function
   * @param input
   * @returns
   */
  getProduct(input: ReadProductInputDto): Promise<GetProductResponse> {
    return firstValueFrom(
      this.productService.getProduct(input as GetProductRequest),
    );
  }
  /**
   * get ListProduct function
   * @param input
   * @returns
   */
  getListProduct(input: GetListProductInput): Promise<GetListProductResponse> {
    return firstValueFrom(
      this.productService.getListProduct(
        input as unknown as GetListProductRequest,
      ),
    );
  }
  /**
   * create Product function
   * @param input
   * @returns
   */
  createProduct(input: CreateProductInputDto): Promise<CreateProductResponse> {
    return firstValueFrom(
      this.productService.createProduct(
        input as unknown as CreateProductRequest,
      ),
    );
  }
  /**
   * update Product function
   * @param input
   * @returns
   */
  updateProduct(input: UpdateProductInputDto): Promise<UpdateProductResponse> {
    return firstValueFrom(
      this.productService.updateProduct(
        input as unknown as UpdateProductRequest,
      ),
    );
  }
  /**
   * delete Product function
   * @param input
   * @returns
   */
  deleteProduct(input: ReadProductInputDto): Promise<DeleteProductResponse> {
    return firstValueFrom(
      this.productService.deleteProduct(input as DeleteProductRequest),
    );
  }
  /**
   * create Payment function
   * @param input
   * @returns
   */
  async createPayment(input: CreatePaymentInputDto, userId: string) {
    return await firstValueFrom(
      this.productService.createPayment(
        input as unknown as CreatePaymentRequest,
        this.metadata.setUserId(userId),
      ),
    );
  }

  async listOrderUser(_id: string): Promise<ListOrderResponse> {
    return await firstValueFrom(
      this.productService.listOrderUser({}, this.metadata.setUserId(_id)),
    );
  }
  async listOrderAdmin(): Promise<ListOrderResponse> {
    return await firstValueFrom(this.productService.listOrderAdmin({}));
  }

  async favoriteProduct(input, userId): Promise<BooleanPayload> {
    return await firstValueFrom(
      this.productService.favoriteProduct(input, userId),
    );
  }

  async isFavoriteEvent(input, userId): Promise<BooleanPayload> {
    return await firstValueFrom(
      this.productService.isFavoriteProduct(input, userId),
    );
  }
}
