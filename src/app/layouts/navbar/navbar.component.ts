import { isPlatformBrowser } from '@angular/common';
import { FlowbiteService } from './../../core/services/flowbite.service';
import { Component, computed, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import { initFlowbite } from 'flowbite';
import { CartService } from '@core/services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _authService = inject(AuthService);
  private readonly _cartService = inject(CartService);
  public isLogged = computed(() => this._authService.isLogged());
  public cartCount = computed(() => this._cartService.cartCount());

  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      if (localStorage.getItem('accessToken')) {
        this._authService.isLogged.set(true);
      }
      this._cartService.cartCount.set(this.getCartCount());
    }
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  logout(): void {
    this._authService.signout();
  }

  getCartCount(): number {
    this._cartService.getUserCart().subscribe({
      next: (res) => {
        return res.numOfCartItems;
      },
    });
    return 0;
  }
}
