import { Injectable } from '@nestjs/common/decorators';
import { ProductDTO } from 'src/DTO/product.dto';
import { Product } from 'src/models/product.model';
import { DataSource, FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  private products: Product[] = [
    { id: 1, category: 2, price: 80000, productName: 'Mouse' },
    { id: 2, category: 3, price: 44000, productName: 'Keyboard' },
  ];

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async createProduct(productDTO: ProductDTO): Promise<Product> {
    const product: Product = {
      id: Math.random(),
      ...productDTO,
    };
    console.log(this.productRepository);

    return await this.productRepository.save(product);
  }

  async detailProduct(id: number): Promise<Product> {
    const options: FindOneOptions<Product> = {
      where: { id },
    };
    return await this.productRepository.findOne(options);
  }

  async updateProduct(productDTO: ProductDTO, id: number): Promise<Product> {
    const options: FindOneOptions<Product> = {
      where: { id },
    };

    const existingProduct = await this.productRepository.findOne(options);

    if (!existingProduct) {
      throw new Error(`Product with ID ${id} not found`);
    }

    Object.assign(existingProduct, productDTO);

    return await this.productRepository.save(existingProduct);
  }

  async deleteProduct(id: number): Promise<any> {
    return await this.productRepository.delete(id);
  }
}
