export default class Cpf {
  value: string;

  constructor(value: string) {
    if (!this.validate(value)) throw new Error('Invalid cpf');
    this.value = value;
  }

  validate(cpf: string) {
    if (!cpf) return false;
    cpf = this.clean(cpf);
    if (!this.hasMinimunLength(cpf)) return false;
    if (this.isBlocked(cpf)) return false;
    const digit1 = this.calculateDigit(cpf, 10);
    const digit2 = this.calculateDigit(cpf, 11);
    const calculatedDigit = `${digit1}${digit2}`;
    const actualDigit = cpf.slice(9);
    return actualDigit === calculatedDigit;
  }

  clean(cpf: string) {
    return cpf.replace(/\D/g, '');
  }

  hasMinimunLength(cpf: string) {
    return cpf.length === 11;
  };

  isBlocked(cpf: string) {
    const [firstDigit] = cpf;
    return [...cpf].every(digit => digit === firstDigit);
  }

  calculateDigit(cpf: string, factor: number) {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) total += Number(digit) * factor--;
    }
    const rest = total % 11;
    return (rest < 2) ? 0 : 11 - rest;
  }
}