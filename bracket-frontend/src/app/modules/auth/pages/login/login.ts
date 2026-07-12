import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

import { AuthFacade } from '../../state/auth.facade';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly authFacade = inject(AuthFacade);

  protected readonly form = this.fb.nonNullable.group({
    username: ['testuser', Validators.required],
    password: ['password123', Validators.required]
  });

  protected onSubmit(): void {
    this.authFacade.login(this.form.getRawValue());
  }

  protected onCreateAccount(): void {
    this.router.navigate(['/create-account']);
  }
}
