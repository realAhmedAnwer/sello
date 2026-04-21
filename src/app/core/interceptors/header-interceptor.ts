import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    if (localStorage.getItem('accessToken')) {
      req = req.clone({ setHeaders: { token: localStorage.getItem('accessToken')! } });
    }
  }
  return next(req);
};
