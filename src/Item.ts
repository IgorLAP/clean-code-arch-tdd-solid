export default class Item {
  constructor(
    readonly idItem: number,
    readonly category: string,
    readonly description: string,
    readonly price: number,
    readonly itemSpecs: {
      width: number,
      height: number,
      depth: number,
      weight: number
    }
  ) { }
}