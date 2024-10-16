import Coupon from "../src/Coupon";
import Item from "../src/Item";
import Order from "../src/Order";

test("Deve criar um pedido com CPF válido", () => {
  const cpf = '839.435.452-10';
  const order = new Order(cpf);
  const total = order.getTotal();

  expect(total).toBe(0);
});

test("Deve tentar criar um pedido com CPF inválido", () => {
  const cpf = '111.111.111-11';

  expect(() => new Order(cpf)).toThrow(new Error('Invalid cpf'));
});

test("Deve fazer um pedido com 3 itens", () => {
  const cpf = '839.435.452-10';
  const order = new Order(cpf);
  order.addItem(new Item(1, 'Música', 'CD', 30, { height: 10, width: 20, depth: 15, weight: 1 }), 3);
  order.addItem(new Item(2, 'Vídeo', 'DVD', 50, { height: 10, width: 20, depth: 15, weight: 1 }), 1);
  order.addItem(new Item(3, 'Vídeo', 'VHS', 10, { height: 10, width: 20, depth: 15, weight: 1 }), 2);
  const total = order.getTotal();
  expect(total).toBe(160);
});

test("Deve fazer um pedido com um cupom de desconto", () => {
  const cpf = '839.435.452-10';
  const order = new Order(cpf);
  order.addItem(new Item(1, 'Música', 'CD', 30, { height: 10, width: 20, depth: 15, weight: 1 }), 3);
  order.addItem(new Item(2, 'Vídeo', 'DVD', 50, { height: 10, width: 20, depth: 15, weight: 1 }), 1);
  order.addItem(new Item(1, 'Vídeo', 'VHS', 10, { height: 10, width: 20, depth: 15, weight: 1 }), 2);
  order.addCoupon(new Coupon('VALE20', 20));
  const total = order.getTotal();
  expect(total).toBe(128);
});

test("Não deve aplicar coupom de desconto expirado", () => {
  const cpf = '839.435.452-10';
  const order = new Order(cpf);
  const addCouponSpy = jest.spyOn(order, 'addCoupon');
  order.addItem(new Item(1, 'Música', 'CD', 30, { height: 10, width: 20, depth: 15, weight: 1 }), 3);
  order.addItem(new Item(2, 'Vídeo', 'DVD', 50, { height: 10, width: 20, depth: 15, weight: 1 }), 1);
  order.addItem(new Item(3, 'Vídeo', 'VHS', 10, { height: 10, width: 20, depth: 15, weight: 1 }), 2);
  order.addCoupon(new Coupon('VALE20', 20, new Date('08/12/1997')));
  const total = order.getTotal();

  expect(total).toBe(160);
});

test("Deve calcular o valor do frete", () => {
  const cpf = '839.435.452-10';
  const order = new Order(cpf);
  order.addItem
    (
      new Item(4, 'Instrumentos Musicais', 'Guitarra', 1000, { height: 100, width: 30, depth: 10, weight: 3 }),
      1
    );
  order.addItem(
    new Item(5, 'Instrumentos Musicais', 'Amplificador', 5000, { height: 100, width: 50, depth: 50, weight: 20 }),
    1
  );
  order.addItem(
    new Item(6,
      'Acessórios', 'Cabo', 30, { height: 10, width: 10, depth: 10, weight: .9 }),
    3
  );

  const shippingCost = order.getShippingCost();

  expect(shippingCost).toBe(239);
});

test("Deve retornar frete de R$10,00 padrão caso valor real seja menor que isso", () => {
  const cpf = '839.435.452-10';
  const order = new Order(cpf);
  order.addItem
    (
      new Item(7, 'Música', 'CD', 100, { height: 100, width: 30, depth: 10, weight: 3 }),
      1
    );

  const shippingCost = order.getShippingCost();

  expect(shippingCost).toBe(440);
});