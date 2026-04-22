import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CartService } from '@core/services/cart.service';
import { Cart } from './models/cart.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly _cartService = inject(CartService);
  private readonly _platformId = inject(PLATFORM_ID);

  public cart = signal<Cart>({} as Cart);

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) this.cart.set(this.getCart());
  }

  getCart(): Cart {
    this._cartService.getUserCart().subscribe({
      next: (res) => {
        return res.data;
      },
    });
    return {} as Cart;
  }

  removeItem(id: string): void {
    this._cartService.removeItem(id).subscribe({
      next: (res) => {
        this._cartService.cartCount.set(res.numOfCartItems);
        this.cart.set(res.data);
      },
    });
  }

  updateItemCount(id: string, count: number): void {
    this._cartService.updateItemCount(id, count).subscribe({
      next: (res) => {
        this._cartService.cartCount.set(res.numOfCartItems);
        this.cart.set(res.data);
      },
    });
  }

  clearCart(): void {
    this._cartService.clear().subscribe({
      next: (res) => {
        this._cartService.cartCount.set(res.numOfCartItems);
        this.cart.set(res.data);
      },
    });
  }
}
