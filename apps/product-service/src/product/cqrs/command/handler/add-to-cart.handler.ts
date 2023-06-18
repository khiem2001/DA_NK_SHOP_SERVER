import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CartRepository } from '../../../cart.repository';
import { CartEntity } from '@app/core/entities/cart';
import { AddToCartResponse } from '@app/proto-schema/proto/product.pb';
import { AddToCartCommand } from '../iml';

@CommandHandler(AddToCartCommand)
export class AddToCartHandler implements ICommandHandler<AddToCartCommand> {
  constructor(private readonly cartRepository: CartRepository) {}
  async execute({ cmd, userId }: AddToCartCommand): Promise<any> {
    const { productId, quantity } = cmd;
    const cart = await this.cartRepository.findOne({
      where: {
        productId,
        deletedAt: null,
      },
    });
    if (cart) {
      await this.cartRepository.findOneAndUpdate(
        {
          productId,
          userId,
          deletedAt: null,
        },
        {
          $inc: { quantity: quantity },
        },
      );
      return { success: true } as AddToCartResponse;
    }
    await this.cartRepository.save(new CartEntity({ ...cmd, userId }));

    return { success: true } as AddToCartResponse;
  }
}
