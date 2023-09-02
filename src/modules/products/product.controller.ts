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
  detailProduct(@Param('id') id: number): ResponseData<Product> {
    try {
      return new ResponseData<Product>(
        this.productService.detailProduct(Number(id)),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Put('/:id')
  updateProduct(
    @Body() productDTO: ProductDTO,
    @Param('id') id: number,
  ): ResponseData<Product> {
    try {
      return new ResponseData<Product>(
        this.productService.updateProduct(productDTO, Number(id)),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: number): ResponseData<boolean> {
    try {
      return new ResponseData<boolean>(
        this.productService.deleteProduct(Number(id)),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<boolean>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
