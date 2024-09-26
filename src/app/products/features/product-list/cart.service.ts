import { Injectable } from '@angular/core';
import { Product } from 'app/products/data-access/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<any[]>([]);
  cart$ = this.cart.asObservable();

  addToCart(product: Product) {
    let index = this.getItemIndex(product.code);
    const currentCart = this.cart.getValue();
    if (index == -1 ) {
      product.quantity = 1;
      this.cart.next([...currentCart, product]);
    } else {
      let item = currentCart[index];
       item.quantity ++;
      currentCart.splice(index,1,item);
      this.cart.next(currentCart);
    }
  
  }

  getItemIndex(code : string) : number{
    return  this.cart.getValue().findIndex(p => p.code == code)
  }
  getItem(code : string) : Product{
    return  this.cart.getValue().find(p => p.code == code)
  }

  removeFromCart(product: any) {
    const currentCart = this.cart.getValue().filter(p => p.code !== product.code);
    this.cart.next(currentCart);
  }

  getProducts() {
    return this.cart.getValue();
  }

  clearCart() {
    this.cart.next([]);
  }
}
