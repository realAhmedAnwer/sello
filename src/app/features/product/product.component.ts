import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import { CartService } from '@core/services/cart.service';
import { WishlistService } from '@core/services/wishlist.service';
import { Product } from '@shared/models/product.interface';
import { ProductsService } from '@shared/services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _productsService = inject(ProductsService);
  private readonly _cartService = inject(CartService);
  private readonly _authService = inject(AuthService);
  private readonly _wishlistService = inject(WishlistService);
  private readonly _toastrService = inject(ToastrService);

  public product = signal<Product | null>(null);
  public activeImage = signal<string>('');
  protected readonly starIndexes = [1, 2, 3, 4, 5];

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.getProductDetails(params.get('id')!);
    });
  }

  getProductDetails(id: string): void {
    this._productsService.getProduct(id).subscribe({
      next: (res) => {
        this.product.set(res.data);
        this.activeImage.set(res.data.imageCover);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  setActiveImage(image: string): void {
    this.activeImage.set(image);
  }

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
