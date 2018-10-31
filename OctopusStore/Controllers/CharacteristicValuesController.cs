﻿//using System.Threading.Tasks;
//using ApplicationCore.Entities;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using ApplicationCore.ViewModels;
//using ApplicationCore.Interfaces;
//using ApplicationCore.Specifications;
//using ApplicationCore.Interfaces.Services;

//// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

//namespace OctopusStore.Controllers
//{
//    [Produces("application/json")]
//    [Route("api/[controller]")]
//    public class CharacteristicValuesController: CRUDController<ICharacteristicValueService, CharacteristicValue, CharacteristicValueViewModel>
//    {
//        public CharacteristicValuesController(
//            ICharacteristicValueService service,
//            IScopedParameters scopedParameters,
//            IAppLogger<ICRUDController<CharacteristicValue>> logger)
//           : base(service, scopedParameters, logger)
//        {
//        }

//        [AllowAnonymous]
//        [HttpGet]
//        public async Task<IndexViewModel<CharacteristicValueViewModel>> Index([FromQuery(Name = "categoryId")]int categoryId)
//        {
//            return await CategoryCharacteristicValuesIndex(categoryId);
//        }
//        [AllowAnonymous]
//        [HttpGet("/api/categories/{categoryId:int}/characteristicValues")]
//        public async Task<IndexViewModel<CharacteristicValueViewModel>> CategoryCharacteristicValuesIndex(int categoryId)
//        {
//            return await base.IndexByFunctionNotPagedAsync(_service.EnumerateByCategoryAsync, new EntitySpecification<Category>(categoryId));
//        }
//        [HttpPut("{id:int}")]
//        public async Task<CharacteristicValueViewModel> Put(int id, [FromBody]CharacteristicValueViewModel characteristicValueViewModel)
//        {
//            characteristicValueViewModel.Id = id;
//            return await base.UpdateAsync(characteristicValueViewModel);
//        }
//        [HttpGet("{id:int}/checkUpdateAuthorization")]
//        public async Task<ActionResult> CheckUpdateAuthorization(int id) => await base.CheckUpdateAuthorizationAsync(id);
//    }
//}