import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IdentityService } from '../identity/identity.service';
import { ParameterService } from '../parameter/parameter.service';
import { ParameterNames } from '../parameter/parameter-names';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  signedInSubscription: Subscription;
  signedIn: boolean;
  email: string;
  searchValue: string;
  isContentAdministrator: boolean;
  isStoreAdministrator: boolean;
  storeId: number;

  constructor(
    private identityService: IdentityService,
    private parameterService: ParameterService,
    private router: Router)
  {
    this.signedIn = this.identityService.signedIn;
    this.fillActions();
      
    this.signedInSubscription = this.identityService.signedIn$.subscribe(
      signedIn => {
        this.signedIn = signedIn;
        this.fillActions();
      });
  }

  ngOnInit() {
    this.parameterService.params$.subscribe(_ => {
      this.searchValue = this.parameterService.getParam("searchValue");
    });
  }

  signOut() {
    this.isContentAdministrator = false;
    this.identityService.signOut();
    this.router.navigate([""]);
  }

  search() {
    if (this.searchValue) {
      this.parameterService.navigateWithParams(
        {
          "searchValue": this.searchValue,
          "page": null,
          "categoryId": this.parameterService.getParam(ParameterNames.categoryId)
        }, "/items");
    }
  }

  fillActions() {
    this.email = this.identityService.currentUserEmail;
    this.isContentAdministrator = this.identityService.isContentAdministrator();
    this.isContentAdministrator = this.identityService.isContentAdministrator();
    let administratedStoreIds = this.identityService.getUserAdministredStoreIds();
    if (administratedStoreIds.length > 0) {
      this.storeId = administratedStoreIds[0];
      this.isStoreAdministrator = true;
    }
  }
}