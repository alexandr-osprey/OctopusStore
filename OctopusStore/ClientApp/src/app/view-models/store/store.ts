import { Entity } from "../entity";

export class Store extends Entity {
  title: string;
  sellerId: string;
  description: string;
  address: string;
  registrationDate: string;

  public constructor(init?: Partial<Store>) {
    super(init);
    Object.assign(this, init);
  }
}