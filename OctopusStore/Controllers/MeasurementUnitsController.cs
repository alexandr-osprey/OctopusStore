﻿//using System.Threading.Tasks;
//using ApplicationCore.Entities;
//using ApplicationCore.Specifications;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using ApplicationCore.ViewModels;
//using ApplicationCore.Interfaces;
//using ApplicationCore.Interfaces.Services;

//// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

//namespace OctopusStore.Controllers
//{
//    [Produces("application/json")]
//    [Route("api/[controller]")]
//    public class MeasurementUnitsController: CRUDController<IMeasurementUnitService, MeasurementUnit, MeasurementUnitViewModel>
//    {
//        public MeasurementUnitsController(
//            IMeasurementUnitService measurementUnitService,
//            IAuthorizationService authorizationService,
//            IScopedParameters scopedParameters,
//            IAppLogger<ICRUDController<MeasurementUnit>> logger)
//           : base(measurementUnitService, scopedParameters, logger)
//        {
//        }

//        // GET: api/<controller>
//        [AllowAnonymous]
//        [HttpGet]
//        public async Task<IndexViewModel<MeasurementUnitViewModel>> Index()
//        {
//            return await base.IndexNotPagedAsync(new EntitySpecification<MeasurementUnit>());
//        }
//        [HttpGet("{id:int}/checkUpdateAuthorization")]
//        public async Task<ActionResult> CheckUpdateAuthorization(int id) => await base.CheckUpdateAuthorizationAsync(id);
//    }
//}