import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@shared/models/product.interface';
import { ProductsService } from '@shared/services/products.service';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _productsService = inject(ProductsService);

  public product = signal<Product | null>(null);
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
