import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('bracket-frontend');
  private readonly http = inject(HttpClient);
  protected readonly backendResponse = signal('Click the button to call the backend.');

  protected makeBackendCall(): void {
    this.http.get('http://localhost:8080/test', { responseType: 'text' }).subscribe({
      next: (response) => {
        this.backendResponse.set(response);
      },
      error: (error) => {
        console.error('Backend call failed', error);
        this.backendResponse.set('Backend call failed. Check that the backend is running on port 8080.');
      }
    });
  }
}
