import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { UserDtoType } from '../user/type';
import { UserLoader, UsersLoader } from './loaders/user.loader';

export interface IDataloaders {
  userLoader: DataLoader<string, UserDtoType>;
  usersLoader: DataLoader<string, UserDtoType[]>;
}

@Injectable()
export class DataloaderService {
  constructor(
    private userLoader: UserLoader,
    private usersLoader: UsersLoader,
  ) {}

  createLoaders(): IDataloaders {
    return {
      userLoader: this.userLoader.generateDataLoader(),
      usersLoader: this.usersLoader.generateDataLoader(),
    };
  }
}
