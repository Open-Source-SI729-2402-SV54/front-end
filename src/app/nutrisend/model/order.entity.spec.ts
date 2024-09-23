import { Order } from './order.entity';

describe('OrderEntity', () => {
  it('should create an instance', () => {
    const order = new Order();
    expect(order).toBeTruthy();
  });
});
