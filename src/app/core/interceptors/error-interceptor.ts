import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const toastrService = inject(ToastrService);

  return next(req).pipe(
    catchError((err) => {
      if (isPlatformBrowser(platformId)) {
        toastrService.error(err.error.message, 'Error', {
          progressBar: true,
          closeButton: true,
        });
      }
      return throwError(() => err);
    }),
  );
};
