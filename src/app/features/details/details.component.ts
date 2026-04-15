import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@shared/models/product.interface';
import { ProductsService } from '@shared/services/products.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _productsService = inject(ProductsService);

  public product = signal<Product>({} as Product);

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
}
