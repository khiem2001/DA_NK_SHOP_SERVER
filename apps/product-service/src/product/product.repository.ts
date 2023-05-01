import { BaseRepository, ProductEntity } from '@app/core';
import { EntityRepository } from 'typeorm';
@EntityRepository(ProductEntity)
export class ProductRepository extends BaseRepository<ProductEntity> {}
