import { ProductService } from './product.service';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/global.enum';
import { Product } from 'src/models/product.model';
import { ProductDTO } from 'src/DTO/product.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(): Promise<Product[]> {
    try {
      return this.productService.getProducts();
    } catch (error) {
      return new Promise<Product[]>(null);
    }
  }

  @Post()
  createProduct(
    @Body(new ValidationPipe()) productDTO: ProductDTO,
  ): Promise<ProductDTO> {
    try {
      return this.productService.createProduct(productDTO);
    } catch (error) {
      return new Promise<Product>(null);
    }
  }

  @Get('/:id')
  async detailProduct(@Param('id') id: number): Promise<Product> {
    try {
      return await this.productService.detailProduct(Number(id));
    } catch (error) {
      return new Promise<Product>(null);
    }
  }

  @Put('/:id')
  async updateProduct(
    @Body() productDTO: ProductDTO,
    @Param('id') id: number,
  ): Promise<Product> {
    try {
      return await this.productService.updateProduct(productDTO, Number(id));
    } catch (error) {
      return new Promise<Product>(null);
    }
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: number): Promise<any> {
    try {
      return await this.productService.deleteProduct(Number(id));
    } catch (error) {
      return new Promise<boolean>(null);
    }
  }
}
