export class Schedule {
  id: number; // ID único del schedule
  userId: number; // ID del usuario asociado
  week: {
    [day: string]: {
      breakfast: number; // ID de la comida para desayuno
      lunch: number; // ID de la comida para almuerzo
      dinner: number; // ID de la comida para cena
    };
  };

  constructor() {
    this.id = 0;
    this.userId = 0;
    this.week = {
      monday: { breakfast: 0, lunch: 0, dinner: 0 },
      tuesday: { breakfast: 0, lunch: 0, dinner: 0 },
      wednesday: { breakfast: 0, lunch: 0, dinner: 0 },
      thursday: { breakfast: 0, lunch: 0, dinner: 0 },
      friday: { breakfast: 0, lunch: 0, dinner: 0 },
      saturday: { breakfast: 0, lunch: 0, dinner: 0 },
      sunday: { breakfast: 0, lunch: 0, dinner: 0 },
    };
  }
}
