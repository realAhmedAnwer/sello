import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { API_ENDPOINTS } from '@core/constants/api.constants';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly _httpClient = inject(HttpClient);
  public cartCount = signal<number>(0);

  addProduct(productId: string): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/${API_ENDPOINTS.cart.addProduct}`, {
      productId: productId,
    });
  }

  getUserCart(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/${API_ENDPOINTS.cart.getProducts}`);
  }

  removeItem(id: string): Observable<any> {
    return this._httpClient.delete(`${environment.baseUrl}/${API_ENDPOINTS.cart.removeItem(id)}`);
  }

  updateItemCount(id: string, count: number): Observable<any> {
    return this._httpClient.put(
      `${environment.baseUrl}/${API_ENDPOINTS.cart.updateItemQuantity(id)}`,
      {
        count: count,
      },
    );
  }

  clear(): Observable<any> {
    return this._httpClient.delete(`${environment.baseUrl}/${API_ENDPOINTS.cart.clear}`);
  }

  createCashOrder(cartId: string, data: object): Observable<any> {
    return this._httpClient.post(
      `${environment.baseUrl}/${API_ENDPOINTS.order.cash(cartId)}`,
      data,
    );
  }

  createCardOrder(cartId: string, data: object): Observable<any> {
    return this._httpClient.post(
      `${environment.baseUrl}/${API_ENDPOINTS.order.card(cartId, environment.appUrl)}`,
      data,
    );
  }
}
