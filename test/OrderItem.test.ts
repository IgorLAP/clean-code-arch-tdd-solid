import OrderItem from "../src/OrderItem";

test('deve criar um item do pedido', () => {
  const orderItem = new OrderItem(1, 1000, 10, { height: 10, width: 20, depth: 15, weight: 1 });
  expect(orderItem.getTotal()).toBe(10000);
});