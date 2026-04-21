import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);

  public step = signal<number>(1);

  public email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  public code: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(6),
  ]);
  public password: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  ]);

  submitEmail(e: Event): void {
    e.preventDefault();
    if (this.email.valid) {
      const data = {
        email: this.email.value,
      };
      this._authService.forgotPassword(data).subscribe({
        next: (res) => {
          this.step.set(2);
        },
      });
    } else {
      this.email.markAsTouched();
    }
  }

  submitCode(e: Event): void {
    e.preventDefault();
    if (this.code.valid) {
      const data = {
        resetCode: this.code.value,
      };
      this._authService.verifyCode(data).subscribe({
        next: (res) => {
          this.step.set(3);
        },
      });
    } else {
      this.code.markAsTouched();
    }
  }

  submitPassword(e: Event): void {
    e.preventDefault();
    if (this.password.valid) {
      const data = {
        email: this.email.value,
        newPassword: this.password.value,
      };
      this._authService.resetPassword(data).subscribe({
        next: (res) => {
          this._router.navigate(['/login']);
        },
      });
    } else {
      this.password.markAsTouched();
    }
  }
}
