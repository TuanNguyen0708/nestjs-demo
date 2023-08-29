import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProdcutService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProdcutService],
})
export class ProductModule {}
