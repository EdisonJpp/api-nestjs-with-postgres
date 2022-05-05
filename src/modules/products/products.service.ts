import { ProductModel } from './product.model';
import { AddProductDto } from './dto/add-product.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductModel)
    private readonly productModel: Repository<ProductModel>,
  ) {}

  insertProduct = async (product: AddProductDto): Promise<ProductModel> =>
    this.productModel.save(this.productModel.create(product));

  getProducts() {
    return this.productModel.find();
  }

  async getSingleProduct(id: number) {
    const res = await this.productModel.findOneBy({ id });
    if (!res) throw new NotFoundException('the product not found');
    return res;
  }

  async updateProduct(id: number, product: ProductModel) {
    await this.productModel.save(this.productModel.create({ id, ...product }));
    return { id };
  }

  async deleteProduct(productId: number) {
    const res = await this.productModel.findOneBy({ id: productId });
    if (!res) throw new NotFoundException('not found the product to remove');
    await this.productModel.delete(productId);
    return res;
  }
}
