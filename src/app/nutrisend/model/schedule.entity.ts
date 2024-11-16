export class Schedule {
  scheduleId: number;
  id: number;
  mealid: number;
  monday: DailyMeals;
  tuesday: DailyMeals;
  wednesday: DailyMeals;
  thursday: DailyMeals;
  friday: DailyMeals;
  saturday: DailyMeals;
  sunday: DailyMeals;

  constructor() {
    this.scheduleId = 0;
    this.id = 0;
    this.mealid = 0;
    this.monday = new DailyMeals();
    this.tuesday = new DailyMeals();
    this.wednesday = new DailyMeals();
    this.thursday = new DailyMeals();
    this.friday = new DailyMeals();
    this.saturday = new DailyMeals();
    this.sunday = new DailyMeals();
  }
}

export class DailyMeals {
  breakfast: number;
  lunch: number;
  dinner: number;

  constructor() {
    this.breakfast = 0;
    this.lunch = 0;
    this.dinner = 0;
  }
}
