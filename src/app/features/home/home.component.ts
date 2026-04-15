import { Component } from '@angular/core';
import { HomeSliderComponent } from './components/home-slider/home-slider.component';
import { HomeCategoriesComponent } from './components/home-categories/home-categories.component';
import { HomeProductsComponent } from './components/home-products/home-products.component';

@Component({
  selector: 'app-home',
  imports: [HomeSliderComponent, HomeCategoriesComponent, HomeProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
