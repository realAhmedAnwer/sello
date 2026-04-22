import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Product } from '@shared/models/product.interface';
import { ProductsService } from '@shared/services/products.service';
import { SectionTitleComponent } from '@shared/components/section-title/section-title.component';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';

@Component({
  selector: 'app-shop',
  imports: [SectionTitleComponent, ProductCardComponent, NgxPaginationModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _productsService = inject(ProductsService);
  public productList = signal<Product[]>([]);
  public pageSize = signal<number>(0);
  public currentPage = signal<number>(0);
  public totalItems = signal<number>(0);

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this.getAllProducts();
    }
  }

  getAllProducts(pageNumber: number = 1): void {
    this._productsService.getAllProducts(pageNumber).subscribe({
      next: (res) => {
        this.pageSize.set(res.metadata.limit);
        this.currentPage.set(res.metadata.currentPage);
        this.totalItems.set(res.results);
        this.productList.set(res.data);
      },
    });
  }
}
