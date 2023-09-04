import { Injectable } from '@nestjs/common/decorators';
import { ProductDTO } from 'src/DTO/product.dto';
import { Product } from 'src/models/product.model';
import { FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async createProduct(productDTO: ProductDTO): Promise<Product> {
    return await this.productRepository.save(productDTO);
  }

  async detailProduct(id: number): Promise<ProductEntity> {
    const options: FindOneOptions<Product> = {
      where: { id },
    };
    return await this.productRepository.findOne(options);
  }

  async updateProduct(productDTO: ProductDTO, id: number): Promise<Product> {
    const existingProduct = await this.detailProduct(id);
    if (!existingProduct) {
      throw new Error(`Product with ID ${id} not found`);
    }

    Object.assign(existingProduct, productDTO);

    return await this.productRepository.save(existingProduct);
  }

  async deleteProduct(id: number): Promise<ProductEntity> {
    const existingProduct = await this.detailProduct(id);
    if (!existingProduct) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return await this.productRepository.remove(existingProduct);
  }
}
