import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import OrderItem from "./OrderItem";

export default class Order {
  cpf: Cpf;
  orderItems: OrderItem[] = [];
  coupon: Coupon | undefined;

  constructor(cpf: string, readonly date: Date = new Date()) {
    this.cpf = new Cpf(cpf);
  }

  addItem(item: Item, quantity: number) {
    this.orderItems.push(
      new OrderItem(
        item.idItem, item.price, quantity,
        {
          depth: item.itemSpecs.depth,
          height: item.itemSpecs.height,
          width: item.itemSpecs.width,
          weight: item.itemSpecs.weight,
        }
      )
    );
  }

  addCoupon(coupon: Coupon) {
    if (coupon.isValid(this.date)) {
      this.coupon = coupon;
    }
  }

  getShippingCost() {
    let total = 0;
    const distance = 1000;
    for (const orderItem of this.orderItems) {
      const volume = orderItem.getVolume();
      const density = orderItem.getDensity();
      const value = (distance * volume * (density / 100));
      total += value;
    };
    return total;
  }

  getTotal() {
    let total = 0;
    for (const orderItem of this.orderItems) {
      total += orderItem.getTotal();
    };
    if (this.coupon) {
      total -= this.coupon.calculateDiscount(total, this.date);
    }
    return total;
  }
}