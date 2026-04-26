import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '@core/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _cartService = inject(CartService);
  public cartId = signal<string>('');
  public paymentMethod = signal<string>('cash');
  public checkoutForm: FormGroup = this._formBuilder.group({
    shippingAddress: this._formBuilder.group({
      details: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: ['', [Validators.required]],
    }),
  });

  ngOnInit(): void {
    this.cartId.set(this.getCartId());
  }

  getCartId(): string {
    return this._activatedRoute.snapshot.paramMap.get('id') ?? '';
  }

  changePaymentMethod(element: HTMLInputElement): void {
    this.paymentMethod.set(element.value);
  }

  submitForm(): void {
    if (this.checkoutForm.valid) {
      if (!this.cartId()) {
        return;
      }

      if (this.paymentMethod() === 'cash') {
        this._cartService.createCashOrder(this.cartId(), this.checkoutForm.value).subscribe({
          next: (res) => {
            if (res.status === 'success') {
              this._router.navigate(['/allorders']);
            }
          },
        });
      } else {
        this._cartService.createCardOrder(this.cartId(), this.checkoutForm.value).subscribe({
          next: (res) => {
            if (res.status === 'success') {
              window.open(res.session.url, '_self');
            }
          },
        });
      }
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }
}
