import {ScheduleMeals} from "./schedule-meals.entity";

export class Notifications {
  id: number;
  userId: number;
  email: string;
  schedule: ScheduleMeals[];

  constructor() {
    this.id = 0;
    this.userId = 0;
    this.email = "";
    this.schedule = [];
  }
}
