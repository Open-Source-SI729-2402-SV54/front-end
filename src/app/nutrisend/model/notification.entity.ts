export class Notification {
  id: number;
  userId: number;
  email: string;
  typeID: number;
  message: string;
  timestamp: string;
  active: boolean;

  constructor() {
    this.id = 0;
    this.userId = 0;
    this.email = "";
    this.typeID = 0;
    this.message = "";
    this.timestamp = "";
    this.active = false;
  }
}
