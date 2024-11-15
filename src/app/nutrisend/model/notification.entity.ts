export class Notification {
  id: number;
  userId: number;
  email: string;
  schedule: Array<{
    typeMealId: number;
    hour: string;
    status: string;
  }>;

  constructor() {
    this.id = 0;
    this.userId = 0;
    this.email = "";
    this.schedule = [];
  }
}
