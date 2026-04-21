import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);

  return next(req).pipe(
    catchError((err) => {
      toastrService.error(err.error.message, 'Error', {
        progressBar: true,
        closeButton: true,
      });
      return throwError(() => err);
    }),
  );
};
