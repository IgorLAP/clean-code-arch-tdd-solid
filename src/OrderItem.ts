export default class OrderItem {
  constructor(
    readonly idItem: number,
    readonly price: number,
    readonly quantity: number,
    readonly itemSpecs: {
      width: number,
      height: number,
      depth: number,
      weight: number,
    }
  ) { }

  getVolume() {
    const rawVolume = (this.itemSpecs.depth / 100) *
      (this.itemSpecs.height / 100) *
      (this.itemSpecs.width / 100);
    const [_, rest] = String(rawVolume).split('.');
    let periodCounter = [];
    for (const i in [...rest]) {
      periodCounter.push(rest[i]);
      const lastNumber = periodCounter[+i - 1];
      const penultimateteNumber = periodCounter[+i - 2];
      const thirdToLastNumber = periodCounter[+i - 3];
      if (lastNumber && penultimateteNumber && thirdToLastNumber) {
        if (lastNumber === penultimateteNumber && thirdToLastNumber) {
          break;
        }
      }
    }
    const total = parseFloat(
      (rawVolume).toFixed(periodCounter.length)
    );
    return total === 0 ? 1 : total;
  }

  getDensity() {
    return (this.itemSpecs.weight / this.getVolume())
  }

  getTotal() {
    return this.price * this.quantity;
  }
}