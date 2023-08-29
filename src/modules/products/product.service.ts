import { Injectable } from '@nestjs/common/decorators';
import { ProductDTO } from 'src/DTO/product.dto';
import { Product } from 'src/models/product.model';

@Injectable()
export class ProdcutService {
  private products: Product[] = [
    { id: 1, category: 2, price: 80000, productName: 'Mouse' },
    { id: 2, category: 3, price: 44000, productName: 'Keyboard' },
  ];

  getProducts(): Product[] {
    return this.products;
  }

  createProduct(productDTO: ProductDTO): Product {
    const product: Product = {
      id: Math.random(),
      ...productDTO,
    };
    this.products.push(product);
    return product;
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

  deleteProduct(): any {
    return 'Delete Product';
  }
}