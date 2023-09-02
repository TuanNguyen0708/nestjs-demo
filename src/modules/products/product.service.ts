import { Injectable } from '@nestjs/common/decorators';
import { ProductDTO } from 'src/DTO/product.dto';
import { Product } from 'src/models/product.model';
import { DataSource, Repository } from 'typeorm';
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

  detailProduct(id: number): Product {
    return this.products.find((item) => item.id === id);
  }

  updateProduct(productDTO: ProductDTO, id: number): Product {
    const index = this.products.findIndex((item) => item.id === id);
    this.products[index].category = productDTO.category;
    this.products[index].price = productDTO.price;
    this.products[index].productName = productDTO.productName;
    return productDTO;
  }

  async deleteProduct(id: number): Promise<any> {
    // const index = this.products.findIndex((item) => item.id === id);
    // if (index !== -1) {
    //   this.products.splice(index, 1);
    //   return true;
    // }
    // return false;
    return await this.productRepository.delete(id);
  }
}
