export class Foot {

    id: number;
    name: string;
    calories: string;
    protein: string;
    fats: string;
    price: string;
    quantity: string;
    img: string;

  constructor(food: {id?: number, name?: string, calories?: string,
    protein?: string, fats?: string, price?: string, quantity?: string,
    img?: string}) {

    this.id = food.id || 0;
    this.name = food.name || '';
    this.calories = food.calories || '';
    this.protein = food.protein || '';
    this.fats = food.fats || '';
    this.price = food.price || '';
    this.quantity = food.quantity || '';
    this.img = food.img || '';
  }
}
