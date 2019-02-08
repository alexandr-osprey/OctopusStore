import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { ItemCreateUpdateComponent } from './item/item-create-update/item-create-update.component';
import { ItemThumbnailIndexComponent } from './item/item-thumbnail-index/item-thumbnail-index.component';
import { ItemDetailComponent } from './item/item-detail/item-detail.component';
import { HomepageComponent } from './homepage/homepage/homepage.component';
import { StoreCreateUpdateComponent } from './store/store-create-update/store-create-update.component';
import { StoreDetailComponent } from './store/store-detail/store-detail.component';
import { StoreIndexComponent } from './store/store-index/store-index.component';
import { IdentitySignInComponent } from './identity/identity-sign-in/identity-sign-in.component';
import { CreateUpdateAuthorizationGuard } from './guards/create-update-authorization-guard';
import { IdentitySignUpComponent } from './identity/identity-sing-up/identity-sign-up.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdministratingHomepageComponent } from './administrating/administrating-homepage/administrating-homepage.component';
import { AdministratorAuthorizationGuard } from './guards/administrator-authorization-guard';
import { CategoryCreateUpdateComponent } from './category/category-create-update/category-create-update.component';
import { CharacteristicCreateUpdateComponent } from './characteristic/characteristic-create-update/characteristic-create-update.component';
import { CharacteristicValueCreateUpdateComponent } from './characteristic-value/characteristic-value-create-update/characteristic-value-create-update.component';
import { BrandCreateUpdateComponent } from './brand/brand-create-update/brand-create-update.component';
import { MeasurementUnitCreateUpdateComponent } from './measurement-unit/measurement-unit-create-update/measurement-unit-create-update.component';
import { CartItemThumbnailIndexComponent } from './cart-item/cart-item-thumbnail-index/cart-item-thumbnail-index.component';
import { OrderCreateComponent } from './order/order-create/order-create.component';
import { OrderThumbnailIndexComponent } from './order/order-thumbnail-index/order-thumbnail-index.component';
import { SignedInAuthorizationGuard } from './guards/signed-in-authorization-guard';


const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    pathMatch: 'full',
  },
  {
    path: 'cart',
    component: CartItemThumbnailIndexComponent,
    pathMatch: 'full',
  },
  {
    path: 'administrating',
    component: AdministratingHomepageComponent,
    canActivate: [AdministratorAuthorizationGuard],
    pathMatch: 'full',
  },
  {
    path: 'signUp',
    component: IdentitySignUpComponent,
    pathMatch: 'full'
  },
  {
    path: 'signIn',
    component: IdentitySignInComponent,
    pathMatch: 'full'
  },
  {
    path: 'administrating',
    pathMatch: 'full',
    canActivate: [AdministratorAuthorizationGuard],
    component: AdministratingHomepageComponent,
  },
  {
    path: 'brands/create',
    pathMatch: 'full',
    canActivate: [AdministratorAuthorizationGuard],
    component: BrandCreateUpdateComponent,
  },
  {
    path: 'brands/:id/update',
    pathMatch: 'full',
    canActivate: [AdministratorAuthorizationGuard],
    component: BrandCreateUpdateComponent,
  },
  {
    path: 'categories/create',
    pathMatch: 'full',
    canActivate: [AdministratorAuthorizationGuard],
    component: CategoryCreateUpdateComponent,
  },
  {
    path: 'categories/:id/update',
    pathMatch: 'full',
    canActivate: [AdministratorAuthorizationGuard],
    component: CategoryCreateUpdateComponent,
  },
  {
    path: 'characteristics/create',
    pathMatch: 'full',
    canActivate: [AdministratorAuthorizationGuard],
    component: CharacteristicCreateUpdateComponent,
  },
  {
    path: 'characteristics/:id/update',
    pathMatch: 'full',
    canActivate: [AdministratorAuthorizationGuard],
    component: CharacteristicCreateUpdateComponent,
  },
  {
    path: 'characteristicValues/create',
    pathMatch: 'full',
    canActivate: [AdministratorAuthorizationGuard],
    component: CharacteristicValueCreateUpdateComponent,
  },
  {
    path: 'characteristicValues/:id/update',
    pathMatch: 'full',
    canActivate: [AdministratorAuthorizationGuard],
    component: CharacteristicValueCreateUpdateComponent,
  },
  {
    path: 'items/create',
    pathMatch: 'full',
    canActivate: [CreateUpdateAuthorizationGuard],
    component: ItemCreateUpdateComponent,
  },
  {
    path: 'items/:id/update',
    component: ItemCreateUpdateComponent,
    pathMatch: 'full',
    canActivate: [CreateUpdateAuthorizationGuard],
  },
  {
    path: 'items/:id/detail',
    component: ItemDetailComponent,
    pathMatch: 'full'
  },
  {
    path: 'items',
    component: ItemThumbnailIndexComponent,
  },
  {
    path: 'measurementUnits/create',
    pathMatch: 'full',
    canActivate: [AdministratorAuthorizationGuard],
    component: MeasurementUnitCreateUpdateComponent,
  },
  {
    path: 'measurementUnits/:id/update',
    pathMatch: 'full',
    canActivate: [AdministratorAuthorizationGuard],
    component: MeasurementUnitCreateUpdateComponent,
  },
  {
    path: 'stores/create',
    component: StoreCreateUpdateComponent,
    pathMatch: 'full',
    canActivate: [CreateUpdateAuthorizationGuard],
  },
  {
    path: 'stores/:id/update',
    component: StoreCreateUpdateComponent,
    pathMatch: 'full',
    canActivate: [CreateUpdateAuthorizationGuard],
  },
  {
    path: 'stores',
    component: StoreIndexComponent,
    canActivate: [CreateUpdateAuthorizationGuard],
  },
  {
    path: 'orders/create',
    component: OrderCreateComponent,
    pathMatch: 'full',
    canActivate: [CreateUpdateAuthorizationGuard],
  },
  {
    path: 'orders',
    //pathMatch: 'full',
    component: OrderThumbnailIndexComponent,
    canActivate: [SignedInAuthorizationGuard],
  },
  {
    path: 'stores/:id/detail',
    component: StoreDetailComponent,
  },

  { path: 'pageNotFound', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
  providers: [CreateUpdateAuthorizationGuard, SignedInAuthorizationGuard, AdministratorAuthorizationGuard]
})
export class AppRoutingModule { }
