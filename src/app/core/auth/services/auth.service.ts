import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '@core/constants/api.constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _router = inject(Router);
  private readonly _httpClient = inject(HttpClient);

  public isLogged = signal<boolean>(false);

  signout(): void {
    localStorage.removeItem('accessToken');
    this.isLogged.set(false);
    this._router.navigate(['/']);
  }

  signin(data: object): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/${API_ENDPOINTS.auth.signin}`, data);
  }

  signup(data: object): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/${API_ENDPOINTS.auth.signup}`, data);
  }

  forgotPassword(data: object): Observable<any> {
    return this._httpClient.post(
      `${environment.baseUrl}/${API_ENDPOINTS.auth.password.forgot}`,
      data,
    );
  }

  verifyCode(data: object): Observable<any> {
    return this._httpClient.post(
      `${environment.baseUrl}/${API_ENDPOINTS.auth.password.verify}`,
      data,
    );
  }

  resetPassword(data: object): Observable<any> {
    return this._httpClient.put(
      `${environment.baseUrl}/${API_ENDPOINTS.auth.password.reset}`,
      data,
    );
  }
}
