export class Exercise {

    id: number;
    name: string;
    description: string;
    price: string;
    img: string;
    quantity: string;

  constructor(food: {id?: number, name?: string, description?: string,
    price?: string,  img?: string, quantity?: string,}) 
    {
    this.id = food.id || 0;
    this.name = food.name || '';
    this.description = food.description || '';
    this.price = food.price || '';
    this.img = food.img || '';
    this.quantity = food.quantity || '';
    }
}
