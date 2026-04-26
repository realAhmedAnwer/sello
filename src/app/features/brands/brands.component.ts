import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { SectionTitleComponent } from '@shared/components/section-title/section-title.component';
import { Brand } from '@shared/models/brand.interface';
import { BrandsService } from '@shared/services/brands.service';

@Component({
  selector: 'app-brands',
  imports: [SectionTitleComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _brandsService = inject(BrandsService);

  public readonly brandList = signal<Brand[]>([]);

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this.loadAllBrands();
    }
  }

  loadAllBrands(): void {
    this._brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandList.set(res.data);
      },
    });
  }
}
