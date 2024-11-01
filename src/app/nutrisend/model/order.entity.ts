export class OrderItem {
  name: string;
  quantity: number;
  price: number;
  category: string;

  constructor(name: string, price: number, category: string) {
    this.name = name;
    this.quantity = 1;
    this.price = price;
    this.category = category;
  }
}

export class Order {
  id: number;
  items: OrderItem[];
  total: number;
  deliveryTime?: string;

  constructor() {
    this.id = this.getNextId();
    this.items = [];
    this.total = 0;
    this.deliveryTime = '';
  }

  private getNextId(): number {
    const currentId = localStorage.getItem('orderIdCounter');
    const newId = currentId ? Number(currentId) + 1 : 1;
    localStorage.setItem('orderIdCounter', newId.toString());
    return newId;
  }
}
