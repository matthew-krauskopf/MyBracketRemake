import { Component, inject } from '@angular/core';

import { AuthFacade } from '../../modules/auth/state/auth.facade';

@Component({
  selector: 'app-banner',
  standalone: true,
  templateUrl: './banner.html',
  styleUrl: './banner.scss'
})
export class Banner {
  private readonly authFacade = inject(AuthFacade);

  protected onLogout(): void {
    this.authFacade.logout();
  }
}
