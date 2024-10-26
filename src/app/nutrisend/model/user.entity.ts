export class User {
  id?: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  plan?: 'basic' | 'premium'; // Agrega la propiedad 'plan'

  constructor() {
    this.id = 0;
    this.name = "";
    this.surname = "";
    this.email = "";
    this.password = "";
    this.plan = undefined; // Inicializa el plan como undefined
  }
}
