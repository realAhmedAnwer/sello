import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Product } from '@shared/models/product.interface';
import { ProductsService } from '@shared/services/products.service';
import { RouterLink } from '@angular/router';
import { SectionTitleComponent } from '@shared/components/section-title/section-title.component';
import { CartService } from '@core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@core/auth/services/auth.service';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';

@Component({
  selector: 'app-home-products',
  imports: [SectionTitleComponent, ProductCardComponent],
  templateUrl: './home-products.component.html',
  styleUrl: './home-products.component.css',
})
export class HomeProductsComponent implements OnInit {
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _productsService = inject(ProductsService);

  public productList = signal<Product[]>([]);

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
}
