import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '@core/constants/api.constants';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly _httpClient = inject(HttpClient);
  getAllProducts(pageNumber: number = 1): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/${API_ENDPOINTS.products.all(pageNumber)}`);
  }
  getProduct(id: string): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/${API_ENDPOINTS.products.single(id)}`);
  }
}
