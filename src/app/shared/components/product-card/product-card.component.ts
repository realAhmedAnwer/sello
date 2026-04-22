import { Product } from '@shared/models/product.interface';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import { CartService } from '@core/services/cart.service';
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
  protected readonly starIndexes = [1, 2, 3, 4, 5];
  public product = input.required<Product>();

  addToCart(id: string): void {
    this._cartService.addProduct(id).subscribe({
      next: (res) => {
        if (this._authService.isLogged()) {
          this._cartService.cartCount.set(res.numOfCartItems);
          this._toastrService.success(res.message);
        } else {
          this._toastrService.warning('Login to add products to cart.');
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
