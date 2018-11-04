﻿using System.Linq;
using System.Threading.Tasks;
using ApplicationCore.Entities;
using ApplicationCore.Exceptions;
using ApplicationCore.Identity;
using ApplicationCore.Interfaces;
using ApplicationCore.Interfaces.Services;
using ApplicationCore.Specifications;
using Infrastructure.Data;

namespace Infrastructure.Services
{
    public class BrandService: Service<Brand>, IBrandService
    {
        public BrandService(
            StoreContext context,
            IIdentityService identityService,
            IScopedParameters scopedParameters,
            IAuthorizationParameters<Brand> authoriationParameters,
            IAppLogger<Service<Brand>> logger)
           : base(context, identityService, scopedParameters, authoriationParameters, logger)
        {
        }

        protected override async Task ValidateCreateWithExceptionAsync(Brand brand)
        {
            await base.ValidateCreateWithExceptionAsync(brand);
            if (string.IsNullOrWhiteSpace(brand.Title))
                throw new EntityValidationException("Title not specified");
        }

        protected override async Task ValidateUpdateWithExceptionAsync(Brand brand)
        {
            await ValidateCreateWithExceptionAsync(brand);
        }

        public override async Task RelinkRelatedAsync(int id, int idToRelinkTo)
        {
            var brandItems = await Context.EnumerateRelatedEnumAsync(Logger, new EntitySpecification<Brand>(id), b => b.Items);
            foreach (var item in brandItems)
                item.BrandId = idToRelinkTo;
            await Context.UpdateSingleAsync(Logger, brandItems);
        }
    }
}
