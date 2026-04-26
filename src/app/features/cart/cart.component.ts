import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CartService } from '@core/services/cart.service';
import { Cart } from './models/cart.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly _cartService = inject(CartService);
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _activatedRoute = inject(ActivatedRoute);

  public cart = signal<Cart>({ products: [] } as unknown as Cart);

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this._activatedRoute.data.subscribe({
        next: (res) => {
          if (res['cartData'] && res['cartData'].data) {
            this.cart.set(res['cartData'].data);
            return;
          }

          if (localStorage.getItem('accessToken')) {
            this._cartService.getUserCart().subscribe({
              next: (cartRes) => {
                this.cart.set(cartRes.data);
                this._cartService.cartCount.set(cartRes.numOfCartItems);
              },
            });
          }
        },
      });
    }
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
