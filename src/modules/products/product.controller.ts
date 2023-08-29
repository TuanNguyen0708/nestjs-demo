import { Controller, Get, Post, Put, Delete, Param, Body, ValidationPipe } from '@nestjs/common';
import { ProdcutService } from './product.service';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/global.enum';
import { Product } from 'src/models/product.model';
import { ProductDTO } from 'src/DTO/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly producService: ProdcutService) {}

  @Get()
  getProducts(): ResponseData<Product[]> {
    try {
      return new ResponseData<Product[]>(
        this.producService.getProducts(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  createProduct(@Body(new ValidationPipe()) productDTO: ProductDTO): ResponseData<ProductDTO> {
    try {
      return new ResponseData<Product>(
        this.producService.createProduct(productDTO),
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

  @Get('/:id')
  detailProduct(@Param('id') id: number): ResponseData<Product> {
    try {
      return new ResponseData<Product>(
        this.producService.detailProduct(Number(id)),
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
  updateProduct(@Body() productDTO: ProductDTO, @Param('id') id: number): ResponseData<Product> {
    try {
      return new ResponseData<Product>(
        this.producService.updateProduct(productDTO, Number(id)),
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
  deleteProduct(): ResponseData<string> {
    try {
      return new ResponseData<string>(
        this.producService.deleteProduct(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<string>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
