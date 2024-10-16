import Coupon from "../src/Coupon";

test('Deve criar um cupom válido', () => {
  const coupon = new Coupon('VALE20', 20, new Date('2024-12-12'));
  const today = new Date('2024-12-11')
  const isValid = coupon.isValid(today);
  expect(isValid).toBeTruthy();
});

test('Deve criar um cupom expirado', () => {
  const coupon = new Coupon('VALE20', 20, new Date('2024-12-12'));
  const today = new Date('2024-12-13')
  const isExpired = coupon.isExpired(today);
  expect(isExpired).toBeTruthy();
});

test('Deve criar um cupom válido e calcular o desconto', () => {
  const coupon = new Coupon('VALE20', 20);
  const amount = coupon.calculateDiscount(1000);
  expect(amount).toBe(200);
});