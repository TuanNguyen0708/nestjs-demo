export class Product {
  id?: number;
  category?: number;
  productName?: string;
  price?: number;

  constructor({ id, category, productName, price }) {
    if (id) this.id === id;
    if (category) this.category === category;
    if (productName) this.productName === productName;
    if (price) this.price === price;
  }
}
