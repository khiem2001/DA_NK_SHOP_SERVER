import { ServiceRegistryModule, TypeOrmConfigService } from '@app/core';
import { AppMetadata } from '@app/core/common';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { PaymentModule } from './payment/payment.module';
import { CommentModule } from './comment/comment.module';

@Global()
@Module({
  imports: [
    //Setup
    ServiceRegistryModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    ProductModule,
    PaymentModule,
    CommentModule,
  ],
  providers: [AppMetadata],
})
export class AppModule {}
