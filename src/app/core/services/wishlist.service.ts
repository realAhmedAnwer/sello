import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { API_ENDPOINTS } from '@core/constants/api.constants';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly _httpClient = inject(HttpClient);
  public wishlistCount = signal<number>(0);

  addProduct(productId: string): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/${API_ENDPOINTS.wishlist.addProduct}`, {
      productId: productId,
    });
  }

  getUserWishlist(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/${API_ENDPOINTS.wishlist.getProducts}`);
  }

  removeItem(id: string): Observable<any> {
    return this._httpClient.delete(`${environment.baseUrl}/${API_ENDPOINTS.wishlist.removeItem(id)}`);
  }
}
