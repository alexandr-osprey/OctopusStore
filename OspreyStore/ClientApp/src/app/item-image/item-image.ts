import { Item } from "../item/item";
import { Image } from "./image";

export class ItemImage extends Image<Item>{
  shown: boolean;

  public constructor(init?: Partial<ItemImage>) {
    super(init);
    Object.assign(this, init);
  }
}
