import { Column, Entity } from 'typeorm';
import { BaseNoSQLEntity } from '../base';
import { Expose, plainToClass } from 'class-transformer';

@Entity('db_cart')
export class CartEntity extends BaseNoSQLEntity {
  @Column()
  @Expose()
  quantity: number;

  @Column()
  @Expose()
  userId: string;

  @Column()
  @Expose()
  productId: string;

  constructor(order: Partial<CartEntity>) {
    super();
    Object.assign(
      this,
      plainToClass(CartEntity, order, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
        exposeUnsetFields: false,
      }),
    );
  }
}
