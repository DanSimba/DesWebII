import { Component, signal } from '@angular/core';
import { Page } from './shared/components/page/page';

@Component({
  selector: 'app-root',
  imports: [Page],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
