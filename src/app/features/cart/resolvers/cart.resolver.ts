import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CartService } from '@core/services/cart.service';
import { of } from 'rxjs';

export const cartResolver: ResolveFn<any> = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const cartService = inject(CartService);

  if (!isPlatformBrowser(platformId)) {
    return of(null);
  }

  const token = localStorage.getItem('accessToken');
  if (!token) {
    return of(null);
  }

  return cartService.getUserCart();
};
