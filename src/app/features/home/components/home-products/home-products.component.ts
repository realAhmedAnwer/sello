import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Product } from '@shared/models/product.interface';
import { ProductsService } from '@shared/services/products.service';
import { RouterLink } from '@angular/router';
import { SectionTitleComponent } from '@shared/components/section-title/section-title.component';
import { CartService } from '@core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@core/auth/services/auth.service';

@Component({
  selector: 'app-home-products',
  imports: [RouterLink, CurrencyPipe, SectionTitleComponent],
  templateUrl: './home-products.component.html',
  styleUrl: './home-products.component.css',
})
export class HomeProductsComponent implements OnInit {
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _toastrService = inject(ToastrService);
  private readonly _authService = inject(AuthService);
  private readonly _productsService = inject(ProductsService);
  private readonly _cartService = inject(CartService);

  public productList = signal<Product[]>([]);
  protected readonly starIndexes = [1, 2, 3, 4, 5];

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this.getAllProducts();
    }
  }

  getAllProducts(): void {
    this._productsService.getAllProducts().subscribe({
      next: (res) => {
        this.productList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToCart(id: string): void {
    this._cartService.addProduct(id).subscribe({
      next: (res) => {
        if (this._authService.isLogged()) {
          this._toastrService.success(res.message, '', {
            progressBar: true,
            closeButton: true,
          });
        } else {
          this._toastrService.warning('Login to add products to cart.', '', {
            progressBar: true,
            closeButton: true,
          });
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
