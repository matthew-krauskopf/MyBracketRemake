import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthFacade } from '../state/auth.facade';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private readonly fb = inject(FormBuilder);
  readonly authFacade = inject(AuthFacade);

  protected readonly form = this.fb.nonNullable.group({
    username: ['testuser', Validators.required],
    password: ['password123', Validators.required]
  });

  protected onSubmit(): void {
    this.authFacade.login(this.form.getRawValue());
  }
}
