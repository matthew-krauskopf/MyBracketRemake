import { Component, inject } from '@angular/core';

import { AuthFacade } from '../auth/state/auth.facade';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  private readonly authFacade = inject(AuthFacade);

  protected onLogout(): void {
    this.authFacade.logout();
  }
}
