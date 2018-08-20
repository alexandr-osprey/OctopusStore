﻿using System.Collections.Generic;

namespace ApplicationCore.Entities
{
    public class Characteristic : Entity
    {
        public string Title { get; set; }
        public int CategoryId { get; set; }

        public Category Category { get; set; }
        public ICollection<CharacteristicValue> CharacteristicValues { get; set; } = new List<CharacteristicValue>();
    }
}