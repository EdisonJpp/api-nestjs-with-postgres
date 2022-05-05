import { LazyModuleLoader } from '@nestjs/core';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

export const Modules = [ProductsModule, UsersModule, AuthModule];

// lazy load
export class LazyModuleLoad {
  constructor(private readonly lazyModuleLoader: LazyModuleLoader) {}

  private paths = [
    {
      path: './users/users.module',
      moduleName: 'UsersModule',
    },
    {
      path: './auth/auth.module',
      moduleName: 'AuthModule',
    },
    {
      path: './products/products.module',
      moduleName: 'ProductsModule',
    },
  ];

  getLazy = async () => {
    const raw = this.paths.map(item => {
      return import(item.path);
    });
    const rawModule = await Promise.all(raw);

    const rawLazy = this.paths.map((it, i) =>
      this.lazyModuleLoader.load(() => rawModule[i][it.moduleName]),
    );

    return await Promise.all(rawLazy);
  };
}
