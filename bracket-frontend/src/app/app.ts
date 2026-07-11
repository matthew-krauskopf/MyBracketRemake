import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Banner } from './components/banner/banner';
import { AuthFacade } from './modules/auth/state/auth.facade';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Banner],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly authFacade = inject(AuthFacade);

  protected readonly isAuthenticated = this.authFacade.isAuthenticated;
}
