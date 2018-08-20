﻿using ApplicationCore.Entities;
using ApplicationCore.Interfaces;
using ApplicationCore.Specifications;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using OctopusStore.Controllers;
using OctopusStore.Specifications;
using OctopusStore.ViewModels;
using System;
using System.Linq;
using System.Threading.Tasks;
using Xunit;
using Xunit.Abstractions;

namespace UnitTests.Controllers
{
    public class CharacteristicControllerTests : ControllerTestBase<Characteristic, CharacteristicsController, ICharacteristicService>
    {
        private readonly ICategoryService _categoryService;
        public CharacteristicControllerTests(ITestOutputHelper output) : base(output)
        {
            _categoryService = Resolve<ICategoryService>();
        }

        [Fact]
        public async Task Index()
        {
            var category = await context.Categories.FirstOrDefaultAsync(c => c.Title == "Smartphones");
            var categories = await _categoryService.ListHierarchyAsync(new Specification<Category>(category.Id));
            var categoryIds = from c in categories select c.Id;
            var spec = new CharacteristicByCategoryIdsSpecification(categoryIds);
            spec.Take = _maxTake;
            var characteristics = await service.ListAsync(spec);
            var expected = new CharacteristicIndexViewModel(1, 1, characteristics.Count(), characteristics);
            var actual = await controller.Index(category.Id);
            Assert.Equal(
                JsonConvert.SerializeObject(expected, Formatting.None, jsonSettings),
                JsonConvert.SerializeObject(actual, Formatting.None, jsonSettings));
        }
        [Fact]
        public async Task IndexShoes()
        {
            var category = await context.Categories.FirstOrDefaultAsync(c => c.Title == "Shoes");
            var categories = await _categoryService.ListHierarchyAsync(new Specification<Category>(category.Id));
            var categoryIds = from c in categories select c.Id;
            var characteristics = await GetQueryable(context).Where(c => categoryIds.Contains(c.CategoryId)).ToListAsync();
            var expected = new CharacteristicIndexViewModel(1, 1, characteristics.Count(), characteristics);
            var actual = await controller.Index(category.Id);
            Assert.Equal(
                JsonConvert.SerializeObject(expected, Formatting.None, jsonSettings),
                JsonConvert.SerializeObject(actual, Formatting.None, jsonSettings));
        }
    }
}