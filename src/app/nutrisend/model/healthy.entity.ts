export class Healthy {
  id: number;
  name: string;
  img: string;
  type: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fats: number;
  price: number;

  constructor() {
    this.id = 0;
    this.img = "";
    this.name = "";
    this.type = "";
    this.calories = 0;
    this.protein = 0;
    this.carbohydrates = 0;
    this.fats = 0;
    this.price = 0;
  }
}
