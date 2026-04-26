import { Product } from '@shared/models/product.interface';
import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import { CartService } from '@core/services/cart.service';
import { WishlistService } from '@core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  private readonly _toastrService = inject(ToastrService);
  private readonly _authService = inject(AuthService);
  private readonly _cartService = inject(CartService);
  private readonly _wishlistService = inject(WishlistService);
  private readonly _router = inject(Router);
  protected readonly starIndexes = [1, 2, 3, 4, 5];
  public product = input.required<Product>();

  addToCart(id: string): void {
    if (!this._authService.isLogged()) {
      this._router.navigate(['/login']);
      return;
    }

    this._cartService.addProduct(id).subscribe({
      next: (res) => {
        this._cartService.cartCount.set(res.numOfCartItems);
        this._toastrService.success(res.message);
      },
    });
  }

  addToWishlist(id: string): void {
    this._wishlistService.addProduct(id).subscribe({
      next: (res) => {
        if (this._authService.isLogged()) {
          this._wishlistService.wishlistCount.set(res.data?.length ?? this._wishlistService.wishlistCount());
          this._toastrService.success(res.message);
        } else {
          this._toastrService.warning('Login to save products to wishlist.');
        }
      },
    });
  }

  protected getStarIconClass(rating: number, star: number): string {
    if (rating >= star) {
      return 'fas fa-star';
    }

    if (rating >= star - 0.5) {
      return 'fas fa-star-half-alt';
    }

    return 'far fa-star';
  }
}
