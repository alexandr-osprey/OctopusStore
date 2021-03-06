﻿using ApplicationCore.Identity;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace Infrastructure.Identity.AuthorizationParameters
{
    public class AuthoriationParametersWithoutAuthorization<T>: IAuthorizationParameters<T> where T: class
    {
        public bool CreateAuthorizationRequired { get; set; } = false;
        public bool ReadAuthorizationRequired { get; set; } = false;
        public bool UpdateAuthorizationRequired { get; set; } = false;
        public bool DeleteAuthorizationRequired { get; set; } = false;
        public OperationAuthorizationRequirement CreateOperationRequirement { get; set; } = OperationAuthorizationRequirements.Create;
        public OperationAuthorizationRequirement ReadOperationRequirement { get; set; } = OperationAuthorizationRequirements.Read;
        public OperationAuthorizationRequirement UpdateOperationRequirement { get; set; } = OperationAuthorizationRequirements.Update;
        public OperationAuthorizationRequirement DeleteOperationRequirement { get; set; } = OperationAuthorizationRequirements.Delete;
    }
}
