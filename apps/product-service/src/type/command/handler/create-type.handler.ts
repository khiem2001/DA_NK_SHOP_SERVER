import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTypeCommand } from '../iml';
import { TypeRepository } from '../../type.repository';
import { TypeEntity } from '@app/core';
import { CreateProductResponse } from '@app/proto-schema/proto/product.pb';

@CommandHandler(CreateTypeCommand)
export class CreateTypeHandler implements ICommandHandler<CreateTypeCommand> {
  constructor(private readonly _typeRepository: TypeRepository) {}
  async execute({ cmd }: CreateTypeCommand): Promise<CreateProductResponse> {
    await this._typeRepository.save(new TypeEntity({ ...cmd }));
    return { success: true } as CreateProductResponse;
  }
}
