﻿using ApplicationCore.Entities;

namespace ApplicationCore.Specifications
{
    public class ItemThumbnailSpecification: EntitySpecification<Item>
    {
        public ItemThumbnailSpecification(int id): base(id)
        {
            AddInclude(i => i.Brand);
            AddInclude(i => i.Category);
            AddInclude(i => i.Store);
            AddInclude(i => i.ItemVariants);
            AddInclude("ItemVariants.Images");
        }
    }
}
