export class ScheduleMeals {
  typeMealId: number;
  hour: string;
  status: string;

  constructor() {
    this.typeMealId = 0;
    this.hour = "";
    this.status = "inactive";
  }
}
