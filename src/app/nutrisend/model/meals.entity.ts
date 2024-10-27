export class Meals {
  id: number;
  name: string;
  categoryID: number;
  typeID: number;
  calories: number;
  protein: number;
  carbohydrates: number;
  fats: number;
  price: number;
  img: string;

  constructor() {
    this.id = 0;
    this.name = "";
    this.categoryID = 0;
    this.typeID = 0;
    this.calories = 0;
    this.protein = 0;
    this.carbohydrates = 0;
    this.fats = 0;
    this.price = 0;
    this.img = "";
  }
}
