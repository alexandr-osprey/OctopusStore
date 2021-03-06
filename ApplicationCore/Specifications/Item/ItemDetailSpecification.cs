﻿using ApplicationCore.Entities;

namespace ApplicationCore.Specifications
{
    public class ItemDetailSpecification: EntitySpecification<Item>
    {
        public ItemDetailSpecification(int id): base(id)
        {
            AddInclude(i => i.Brand);
            AddInclude(i => i.Category);
            AddInclude(i => i.Store);
            AddInclude(i => i.ItemVariants);
            AddInclude("ItemVariants.Images");

            Description += "Includes Images, Brand, Category, MeasurementUnit, Store, ItemVariants";
        }
    }
}
