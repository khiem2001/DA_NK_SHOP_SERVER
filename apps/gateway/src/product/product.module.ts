import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { PubSubModule } from '@app/core';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';

@Module({
  imports: [PubSubModule],
  providers: [ProductResolver, ProductService, CommentResolver, CommentService],
})
export class ProductModule {}
