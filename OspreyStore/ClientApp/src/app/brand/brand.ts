import { Entity } from "../models/entity/entity";

export class Brand extends Entity {
  title: string;

  public constructor(init?: Partial<Brand>) {
    super(init);
    Object.assign(this, init);
  }
}
