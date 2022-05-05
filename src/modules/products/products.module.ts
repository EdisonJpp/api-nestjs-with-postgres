import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from './product.model';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductModel])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
