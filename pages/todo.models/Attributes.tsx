export class Attributes<T> {
  constructor(private data: T) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: T): void {
    Object.assign(this.data, update);
  }
}
