import { CreateProductHandler } from './create-product.handler';
import { DeleteProductHandler } from './delete-product.handler';
import { FavoriteProductHandler } from './favorite-product.handler';
import { UpdateProductHandler } from './update-product.handler';

export const ProductCommandHandlers = [
  CreateProductHandler,
  UpdateProductHandler,
  DeleteProductHandler,
  FavoriteProductHandler,
];
