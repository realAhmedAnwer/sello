import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '@core/constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);

  signin(data: object): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/${API_ENDPOINTS.auth.signin}`, data);
  }
  
  signup(data: object): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/${API_ENDPOINTS.auth.signup}`, data);
  }
}
