export class Meal {
  id: number;
  name: string;
  kcal: string;
  protein: string;
  fat: string ;
  photo: string;

  constructor(meal: {id?: number, name?: string, kcal?: string,
    protein?: string, fat?: string, photo?: string}) {

    this.id = meal.id || 0;
    this.name = meal.name || '';
    this.kcal = meal.kcal || '';
    this.protein = meal.protein || '';
    this.fat = meal.fat || '';
    this.photo = meal.photo || '';
  }
}

