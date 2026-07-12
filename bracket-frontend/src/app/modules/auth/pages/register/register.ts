import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AuthFacade } from '../../state/auth.facade';

export const checkPasswords = () => {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (!password?.value || !confirmPassword?.value) {
      return null; // Don't validate if fields are empty
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({passwordMismatch: true})
    } else {
      confirmPassword.setErrors(null);
    }
    return null;
  };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  private readonly fb = inject(FormBuilder);
  readonly authFacade = inject(AuthFacade);

  protected readonly form = this.fb.nonNullable.group(
    {
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    },
    { validators: checkPasswords() }
  );

  protected onSubmit(): void {
    const { confirmPassword, ...request } = this.form.getRawValue();
    this.authFacade.register(request);
  }
}
