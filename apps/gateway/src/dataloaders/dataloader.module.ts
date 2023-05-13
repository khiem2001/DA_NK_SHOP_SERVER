import { Module } from '@nestjs/common';
import { UserLoader, UsersLoader } from './loaders/user.loader';
import { DataloaderService } from './dataloader.service';
import { ManyMediaLoader, MediaLoader } from './loaders/media.loader';

@Module({
  imports: [],
  providers: [
    UserLoader,
    UsersLoader,
    DataloaderService,
    MediaLoader,
    ManyMediaLoader,
  ],
  exports: [
    UserLoader,
    UsersLoader,
    DataloaderService,
    MediaLoader,
    ManyMediaLoader,
  ],
})
export class DataloaderModule {}
