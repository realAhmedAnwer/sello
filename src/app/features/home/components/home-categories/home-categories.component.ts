import { Component, inject, OnInit, signal } from '@angular/core';
import { Category } from '@shared/models/category.interface';
import { CategoriesService } from '@shared/services/categories.service';

@Component({
  selector: 'app-home-categories',
  imports: [],
  templateUrl: './home-categories.component.html',
  styleUrl: './home-categories.component.css',
})
export class HomeCategoriesComponent implements OnInit {
  private readonly _categoriesService = inject(CategoriesService);

  public categoryList = signal<Category[]>([]);

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
