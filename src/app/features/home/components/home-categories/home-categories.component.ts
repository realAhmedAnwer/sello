import { Component, inject, OnInit, signal } from '@angular/core';
import { Category } from '@shared/models/category.interface';
import { CategoriesService } from '@shared/services/categories.service';
import { SectionTitleComponent } from '@shared/components/section-title/section-title.component';

@Component({
  selector: 'app-home-categories',
  imports: [SectionTitleComponent],
  templateUrl: './home-categories.component.html',
  styleUrl: './home-categories.component.css',
})
export class HomeCategoriesComponent implements OnInit {
  private readonly _categoriesService = inject(CategoriesService);

  public categoryList = signal<Category[]>([]);
  protected readonly promos = [
    {
      badge: 'Deal of the Day',
      title: 'Fresh Organic Fruits',
      description: 'Get up to 40% off on selected organic fruits',
      discount: '40% OFF',
      code: 'ORGANIC40',
      cta: 'Shop Now',
      note: 'Picked for healthy weekly baskets',
      icon: 'fas fa-leaf',
      containerClasses:
        'bg-[linear-gradient(135deg,#10b981_0%,#0f9f6e_52%,#0b6b54_100%)] text-white shadow-[0_30px_80px_rgba(15,159,110,0.26)]',
      badgeClasses: 'bg-white/14 text-white',
      buttonClasses: 'bg-white text-primary hover:bg-emerald-50',
      panelClasses: 'bg-white/10 border-white/10',
      orbClasses: 'bg-white/10',
    },
    {
      badge: 'New Arrivals',
      title: 'Exotic Vegetables',
      description: 'Discover our latest collection of premium vegetables',
      discount: '25% OFF',
      code: 'FRESH25',
      cta: 'Explore Now',
      note: 'Seasonal picks with premium freshness',
      icon: 'fas fa-carrot',
      containerClasses:
        'bg-[linear-gradient(135deg,#ff9f43_0%,#ff6b57_48%,#ff4778_100%)] text-white shadow-[0_30px_80px_rgba(255,120,70,0.26)]',
      badgeClasses: 'bg-white/14 text-white',
      buttonClasses: 'bg-white text-[#ff5a55] hover:bg-orange-50',
      panelClasses: 'bg-white/10 border-white/10',
      orbClasses: 'bg-white/10',
    },
  ];

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this._categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
