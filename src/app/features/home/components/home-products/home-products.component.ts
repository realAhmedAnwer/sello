import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '@shared/models/product.interface';
import { ProductsService } from '@shared/services/products.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home-products',
  imports: [RouterLink],
  templateUrl: './home-products.component.html',
  styleUrl: './home-products.component.css',
})
export class HomeProductsComponent implements OnInit {
  private readonly _productsService = inject(ProductsService);

  public productList = signal<Product[]>([]);

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
}
