import { Component } from '@angular/core';

@Component({
  selector: 'app-home-slider',
  imports: [],
  templateUrl: './home-slider.component.html',
  styleUrl: './home-slider.component.css',
})
export class HomeSliderComponent {
  protected readonly benefits = [
    {
      icon: 'fas fa-truck-fast',
      title: 'Free Shipping',
      subtitle: 'On orders over 500 EGP',
      iconClasses: 'bg-sky-500/10 text-sky-600',
    },
    {
      icon: 'fas fa-shield-heart',
      title: 'Secure Payment',
      subtitle: '100% secure transactions',
      iconClasses: 'bg-emerald-500/10 text-emerald-600',
    },
    {
      icon: 'fas fa-rotate-left',
      title: 'Easy Returns',
      subtitle: '14-day return policy',
      iconClasses: 'bg-amber-500/10 text-amber-600',
    },
    {
      icon: 'fas fa-headset',
      title: '24/7 Support',
      subtitle: 'Dedicated support team',
      iconClasses: 'bg-violet-500/10 text-violet-600',
    },
  ];
}
