import { Module } from '@nestjs/common';
import { UserLoader, UsersLoader } from './loaders/user.loader';
import { DataloaderService } from './dataloader.service';

@Module({
  imports: [],
  providers: [UserLoader, UsersLoader, DataloaderService],
  exports: [UserLoader, UsersLoader, DataloaderService],
})
export class DataloaderModule {}
