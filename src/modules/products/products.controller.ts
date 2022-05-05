import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductModel } from './product.model';
import { ProductsService } from './products.service';
import { AddProductDto } from './dto/add-product.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiCreatedResponse({ type: ProductModel, isArray: true })
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Post('/add')
  @ApiBody({ type: AddProductDto })
  @ApiCreatedResponse({
    description: 'add users',
    isArray: false,
    type: ProductModel,
  })
  addProduct(@Body() Body: AddProductDto) {
    return this.productsService.insertProduct(Body);
  }

  @Get(':id/show')
  @ApiCreatedResponse({ type: ProductModel })
  getProduct(@Param('id') prodId: number) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id/update')
  @ApiCreatedResponse({ type: ProductModel })
  updateProduct(@Param('id') prodId: number, @Body() product: ProductModel) {
    return this.productsService.updateProduct(prodId, product);
  }

  @Delete(':id/remove')
  @ApiCreatedResponse({ type: ProductModel })
  removeProduct(@Param('id') prodId: number) {
    return this.productsService.deleteProduct(prodId);
  }
}
