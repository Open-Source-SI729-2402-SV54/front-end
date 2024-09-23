export class Order {
  breakfast: Array<{ name: string; price: number }>;
  lunch: Array<{ name: string; price: number }>;
  dinner: Array<{ name: string; price: number }>;
  address: string;

  constructor(
    breakfast: Array<{ name: string; price: number }> = [],
    lunch: Array<{ name: string; price: number }> = [],
    dinner: Array<{ name: string; price: number }> = [],
    address: string = ''
  ) {
    this.breakfast = breakfast;
    this.lunch = lunch;
    this.dinner = dinner;
    this.address = address;
  }
}
