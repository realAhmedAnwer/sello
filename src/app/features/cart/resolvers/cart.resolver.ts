import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CartService } from '@core/services/cart.service';

export const cartResolver: ResolveFn<any> = (route, state) => {
  const cartService = inject(CartService);
  return cartService.getUserCart();
};
