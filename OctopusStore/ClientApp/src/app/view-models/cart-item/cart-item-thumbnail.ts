import { Entity } from "../entity/entity";
import { ItemVariant } from "../item-variant/item-variant";
import { Item } from "../item/item";
import { MeasurementUnit } from "../measurement-unit/measurement-unit";

export class CartItemThumbnail extends Entity {
  itemVariant: ItemVariant;
  item: Item;
  measurementUnit: MeasurementUnit;

  number: number;

  public constructor(init?: Partial<CartItemThumbnail>) {
    super(init);
    Object.assign(this, init);
    this.itemVariant = new ItemVariant(init.itemVariant);
    this.item = new Item(init.item);
    this.measurementUnit = new MeasurementUnit(init.measurementUnit);
  }
}