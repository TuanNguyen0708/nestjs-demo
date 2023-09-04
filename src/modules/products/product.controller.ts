import { ProductService } from './product.service';
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
  UseGuards
} from '@nestjs/common';
import { ProductEntity } from 'src/entities/product.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getProducts(): Promise<Product[]> {
    try {
      return this.productService.getProducts();
    } catch (error) {
      return new Promise<Product[]>(null);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async detailProduct(@Param('id') id: number): Promise<Product> {
    try {
      return await this.productService.detailProduct(Number(id));
    } catch (error) {
      return new Promise<Product>(null);
    }
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async deleteProduct(@Param('id') id: number): Promise<ProductEntity> {
    try {
      return await this.productService.deleteProduct(Number(id));
    } catch (error) {
      return new Promise<ProductEntity>(null);
    }
  }
}
