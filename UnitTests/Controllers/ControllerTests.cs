﻿using ApplicationCore.Entities;
using ApplicationCore.Interfaces.Controllers;
using ApplicationCore.Interfaces.Services;
using ApplicationCore.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
using Xunit.Abstractions;

namespace UnitTests.Controllers
{
    public abstract class ControllerTests<TEntity, TViewModel, TController, TService>
       : TestBase<TEntity>
        where TEntity : Entity
        where TViewModel: EntityViewModel<TEntity>
        where TController : IController<TEntity, TViewModel>
        where TService : IService<TEntity>
    {
        protected TController Controller { get; }
        protected TService Service { get; }

        public ControllerTests(ITestOutputHelper output): base(output)
        {
            Controller = Resolve<TController>();
            Service = Resolve<TService>();
            (Controller as Controller).ControllerContext.HttpContext = new DefaultHttpContext();
        }

        [Fact]
        public async Task CreateAsync()
        {
            foreach(var entity in GetCorrectEntitiesToCreate())
            {
                var expected = ToViewModel(entity);
                var actual = await Controller.CreateAsync(expected);
                //Assert.True(await _context.Set<TEntity>().AnyAsync(e => e.Id == entity.Id));
                AssertCreateSuccess(expected, actual);
            }
        }

        protected abstract IEnumerable<TEntity> GetCorrectEntitiesToCreate();
        protected virtual void AssertCreateSuccess(TViewModel expected, TViewModel actual)
        {
            Assert.NotEqual(0, actual.Id);
            expected.Id = actual.Id;
            Equal(expected, actual);
        }
        protected abstract TViewModel ToViewModel(TEntity entity);

        [Fact]
        public async Task ReadAsync()
        {
            var entity = await Context.Set<TEntity>().FirstOrDefaultAsync();
            var expected = ToViewModel(entity);
            var actual = await Controller.ReadAsync(entity.Id);
            Equal(expected, actual);
        }

        [Fact]
        public async Task UpdateAsync()
        {
            foreach(var entity in GetCorrectEntitiesToUpdate())
            {
                var beforeUpdate = await Context.Set<TEntity>().FirstAsync(e => e == entity);
                var expected = ToViewModel(entity);
                var actual = await Controller.UpdateAsync(expected);
                AssertUpdateSuccess(beforeUpdate, expected, actual);
            }
        }

        protected abstract IEnumerable<TEntity> GetCorrectEntitiesToUpdate();

        protected virtual void AssertUpdateSuccess(TEntity beforeUpdate, TViewModel expected, TViewModel actual)
        {
            Equal(expected, actual);
        }

        [Fact]
        public async Task DeleteAsync()
        {
            var entity = await Context.Set<TEntity>().LastAsync();
            await Controller.DeleteAsync(entity.Id);
            Assert.False(await Context.Set<TEntity>().ContainsAsync(entity));
        }

        public int GetPageCount(int totalCount, int pageSize)
        {
            return (int)Math.Ceiling((decimal)totalCount / pageSize);
        }
    }
}
