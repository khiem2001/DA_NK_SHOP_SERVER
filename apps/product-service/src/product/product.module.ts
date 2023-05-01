import { AppMetadata, FindNoSQL, ProductEntity } from '@app/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { ProductController } from './product.controller';
import { ProductCommandHandlers } from './cqrs/command';
import { ProductQueryHandlers } from './cqrs/query';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, ProductRepository])],
  controllers: [ProductController],
  providers: [
    FindNoSQL,
    ...ProductCommandHandlers,
    ...ProductQueryHandlers,
    AppMetadata,
  ],
})
export class ProductModule {}
