import { isPlatformBrowser } from '@angular/common';
import { FlowbiteService } from './../../core/services/flowbite.service';
import { Component, computed, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _authService = inject(AuthService);

  public isLogged = computed(() => this._authService.isLogged());

  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (localStorage.getItem('accessToken')) {
        this._authService.isLogged.set(true);
      }
    }
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  logout(): void {
    this._authService.signout();
  }
}
