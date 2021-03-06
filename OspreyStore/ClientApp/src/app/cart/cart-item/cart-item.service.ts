import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { CartItem } from './cart-item';
import { CartItemThumbnail } from './cart-item-thumbnail';
import { DataReadWriteService } from 'src/app/services/data-read-write.service';
import { IdentityService } from 'src/app/identity/identity.service';
import { ItemService } from 'src/app/item/item.service';
import { ItemVariantService } from 'src/app/item-variant/item-variant.service';
import { MessageService } from 'src/app/message/message.service';
import { EntityIndex } from 'src/app/models/entity/entity-index';
import { ParameterNames } from 'src/app/parameter/parameter-names';
import { ItemVariant } from '../../item-variant/item-variant';
import { ItemVariantThumbnail } from '../../item-variant/item-variant-thumbnail';

@Injectable({
  providedIn: 'root'
})
export class CartItemService extends DataReadWriteService<CartItem> {
  protected localStorageKey: string = "cartItemLocalStorage";
  public cartItemThumbnails: CartItemThumbnail[] = [];
  protected cartItemThumbnailsSource = new Subject<any>();
  public cartItemThumbnails$ = this.cartItemThumbnailsSource.asObservable();

  constructor(
    protected http: HttpClient,
    protected router: Router,
    protected identityService: IdentityService,
    protected itemService: ItemService,
    protected itemVariantService: ItemVariantService,
    protected messageService: MessageService) {
    super(http, router, identityService, messageService);
    this.remoteUrl = '/api/cartItems';
    this.serviceName = 'Cart items service';
    this.getAuthenticationRequired = true;

    this.initialize();
  }

  protected initialize() {
    this.identityService.signedIn$.subscribe(signedIn => {
      if (signedIn) {
        this.addLocalCartItemsToServer();
      } else {
        this.cartItemThumbnails = [];
        this.cartItemThumbnailsSource.next(this.getCopy());
      }
    });
    this.updateCartItemThumbnails();
  }

  public updateCartItemThumbnails(): void {
    this.cartItemThumbnails = [];
    if (this.identityService.signedIn) {
      this.loadFromServer();
    } else {
      this.loadFromLocal();
    }
  }

  public addToCart(cartItemToAdd: CartItem): Observable<CartItemThumbnail[]> {
    let cartItemSubject = new Subject<CartItemThumbnail[]>();
    if (this.identityService.signedIn) {
      this.putCustom<CartItemThumbnail>(cartItemToAdd, this.getUrlWithParameter('addToCart'), {}, this.defaultHttpHeaders)
        .subscribe((added: CartItemThumbnail) => {
          if (added) {
            this.updateCartItemThumbnail(new CartItemThumbnail(added));
            cartItemSubject.next(this.getCopy());
          }
        });
    } else {
      let existing = this.cartItemThumbnails.find(c => c.itemVariant.id == cartItemToAdd.itemVariantId);
      if (existing) {
        existing.number += cartItemToAdd.number;
        this.updateCartItemThumbnail(existing);
        this.updateCartItemThumbnailLocal(existing);
      } else {
        this.createCartItemThumbnail(cartItemToAdd)
          .subscribe((newCartItem: CartItemThumbnail) => {
            this.updateCartItemThumbnail(newCartItem);
            this.updateCartItemThumbnailLocal(newCartItem);
          });
      }
    };
    cartItemSubject.next(this.getCopy());
    return cartItemSubject.asObservable();
  }

  protected createCartItemThumbnail(cartItemToAdd: CartItem): Observable<CartItemThumbnail> {
    let result = new Subject<CartItemThumbnail>();
    this.itemVariantService.getThumbnail(cartItemToAdd.itemVariantId)
      .subscribe((variant: ItemVariantThumbnail) => {
        if (variant) {
          let newCartItem = new CartItemThumbnail({ itemVariant: variant, itemVariantId: variant.id, number: cartItemToAdd.number, itemVariantImage: variant.images[0] });
          result.next(newCartItem);
        }
      })
    return result.asObservable();
  }

  public removeFromCart(cartItem: CartItem): Observable<CartItemThumbnail[]> {
    let cartItemSubject = new Subject<CartItemThumbnail[]>();
    let existing = this.cartItemThumbnails.find(c => c.itemVariant.id == cartItem.itemVariantId);
    if (existing) {
      existing.number -= cartItem.number;
      if (this.identityService.signedIn) {
        this.putCustom<Response>(cartItem, this.getUrlWithParameter('removeFromCart'), {}, this.defaultHttpHeaders)
          .subscribe((response: Response) => {
            if (response) {
              this.updateCartItemThumbnail(existing);
            }
          });
      } else {
        this.updateCartItemThumbnailLocal(existing);
        this.updateCartItemThumbnail(existing);
      }
    }
    cartItemSubject.next(this.getCopy());
    return cartItemSubject.asObservable();
  }

  public setCartItem(cartItem: CartItem): Observable<CartItemThumbnail[]> {
    let existing = this.cartItemThumbnails.find(c => c.itemVariant.id == cartItem.itemVariantId);
    let numberToAddRemove = cartItem.number;
    if (existing) {
      numberToAddRemove = cartItem.number - existing.number;
    }
    if (numberToAddRemove == 0) {
      let cartItemSubject = new Subject<CartItemThumbnail[]>();
      this.delay(5).then(() => {
        cartItemSubject.next(this.getCopy());
      });
      return cartItemSubject.asObservable();
    }
    if (numberToAddRemove > 0) {
      let item = new CartItem({ itemVariantId: cartItem.itemVariantId, number: numberToAddRemove });
      return this.addToCart(item);
    } else {
      let item = new CartItem({ itemVariantId: cartItem.itemVariantId, number: numberToAddRemove * -1 });
      return this.removeFromCart(item);
    }
  }

  protected updateCartItemThumbnail(cartItemThumbnail: CartItemThumbnail): CartItemThumbnail {
    if (cartItemThumbnail.number <= 0) {
      this.cartItemThumbnails = this.cartItemThumbnails.filter(c => c.itemVariant.id != cartItemThumbnail.itemVariant.id);
    } else {
      let index = this.cartItemThumbnails.findIndex(c => c.itemVariant.id == cartItemThumbnail.itemVariant.id);
      if (index >= 0) {
        this.cartItemThumbnails[index] = cartItemThumbnail;
      }
      else {
        this.cartItemThumbnails.push(cartItemThumbnail);
      }
    }
    this.cartItemThumbnailsSource.next(this.getCopy());
    return cartItemThumbnail;
  }

  public indexThumbnails() {
    return this.getCustom<EntityIndex<CartItemThumbnail>>(this.getUrlWithParameter(ParameterNames.thumbnails), {}, this.defaultHttpHeaders);
  }

  protected loadFromLocal() {
    let items = this.readLocalCartItems();
    items.forEach(i => this.addToCart(i));
    this.cartItemThumbnailsSource.next(this.getCopy());
  }

  protected loadFromServer() {
    this.indexThumbnails()
      .subscribe((index: EntityIndex<CartItemThumbnail>) => {
        if (index) {
          index.entities.forEach(i => {
            this.updateCartItemThumbnail(new CartItemThumbnail(i));
          });
        }
      });
    this.cartItemThumbnailsSource.next(this.getCopy());
  }

  protected updateCartItemThumbnailLocal(cartItemThumbnail: CartItemThumbnail): void {
    let localItems = this.readLocalCartItems();
    let index = localItems.findIndex(c => c.itemVariantId == cartItemThumbnail.itemVariant.id);
    if (cartItemThumbnail.number > 0) {
      if (index < 0) {
        index = localItems.push(new CartItem({ itemVariantId: cartItemThumbnail.itemVariant.id })) - 1;
      }
      localItems[index].number = cartItemThumbnail.number;
    } else {
      if (index >= 0) {
        localItems = localItems.filter(i => i != localItems[index]);
      }
    }
    localStorage.setItem(this.localStorageKey, JSON.stringify(localItems));
  }

  protected readLocalCartItems(): CartItem[] {
    let result: CartItem[] = [];
    let saved = localStorage.getItem(this.localStorageKey);
    if (saved) {
      result = JSON.parse(saved);
    }
    return result;
  }

  protected addLocalCartItemsToServer() {
    let oldCartItemThumbnails = this.cartItemThumbnails.slice();
    this.cartItemThumbnails = [];
    oldCartItemThumbnails.forEach(c => {
      this.addToCart(new CartItem({ itemVariantId: c.itemVariant.id, number: c.number }));
    });
    localStorage.removeItem(this.localStorageKey);
  }

  protected getCopy(): CartItemThumbnail[] {
    return this.cartItemThumbnails.map(c => new CartItemThumbnail(c));
  }
}
