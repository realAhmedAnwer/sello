import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '@shared/models/product.interface';
import { ProductsService } from '@shared/services/products.service';
import { RouterLink } from '@angular/router';
import { SectionTitleComponent } from '@shared/components/section-title/section-title.component';

@Component({
  selector: 'app-home-products',
  imports: [RouterLink, CurrencyPipe, SectionTitleComponent],
  templateUrl: './home-products.component.html',
  styleUrl: './home-products.component.css',
})
export class HomeProductsComponent implements OnInit {
  private readonly _productsService = inject(ProductsService);

  public productList = signal<Product[]>([]);
  protected readonly starIndexes = [1, 2, 3, 4, 5];

  ngOnInit(): void {
    this.getAllProducts();
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
