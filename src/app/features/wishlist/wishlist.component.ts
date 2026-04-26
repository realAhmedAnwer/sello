import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '@core/services/cart.service';
import { WishlistService } from '@core/services/wishlist.service';
import { SectionTitleComponent } from '@shared/components/section-title/section-title.component';
import { Product } from '@shared/models/product.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, CurrencyPipe, SectionTitleComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _wishlistService = inject(WishlistService);
  private readonly _cartService = inject(CartService);
  private readonly _toastrService = inject(ToastrService);

  public wishlistProducts = signal<Product[]>([]);

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this.getWishlist();
    }
  }

  getWishlist(): void {
    this._wishlistService.getUserWishlist().subscribe({
      next: (res) => {
        this.wishlistProducts.set(res.data);
        this._wishlistService.wishlistCount.set(res.count ?? res.data?.length ?? 0);
      },
    });
  }

  removeItem(id: string): void {
    this._wishlistService.removeItem(id).subscribe({
      next: (res) => {
        this.wishlistProducts.update((products) => products.filter((product) => product._id !== id));
        this._wishlistService.wishlistCount.set(res.data?.length ?? this.wishlistProducts().length);
        this._toastrService.success(res.message);
      },
    });
  }

  addToCart(id: string): void {
    this._cartService.addProduct(id).subscribe({
      next: (res) => {
        this._cartService.cartCount.set(res.numOfCartItems);
        this._toastrService.success(res.message);
      },
    });
  }
}
