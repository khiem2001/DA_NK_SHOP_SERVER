import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { UserDtoType } from '../user/type';
import { UserLoader, UsersLoader } from './loaders/user.loader';
import { ManyMediaLoader, MediaLoader } from './loaders/media.loader';
import { Media } from '../product/type';

export interface IDataloaders {
  userLoader: DataLoader<string, UserDtoType>;
  usersLoader: DataLoader<string, UserDtoType[]>;
  mediaLoader: DataLoader<string, Media>;
  manyMediaLoader: DataLoader<string, Media[]>;
}

@Injectable()
export class DataloaderService {
  constructor(
    private userLoader: UserLoader,
    private usersLoader: UsersLoader,
    private manyMediaLoader: ManyMediaLoader,
    private mediaLoader: MediaLoader,
  ) {}

  createLoaders(): IDataloaders {
    return {
      userLoader: this.userLoader.generateDataLoader(),
      usersLoader: this.usersLoader.generateDataLoader(),
      manyMediaLoader: this.manyMediaLoader.generateDataLoader(),
      mediaLoader: this.mediaLoader.generateDataLoader(),
    };
  }
}
