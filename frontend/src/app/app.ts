import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Page } from './shared/components/page/page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Page],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
