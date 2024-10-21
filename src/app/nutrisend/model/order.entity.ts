export class OrderItem {
  name: string;
  quantity: number;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.quantity = 0;
    this.price = price;
  }
}

export class Order {
  id: number;
  items: OrderItem[];
  total: number;

  constructor() {
    this.id = 0;
    this.items = [];
    this.total = 0;
  }
}
