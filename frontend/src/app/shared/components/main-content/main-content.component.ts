import { Component } from '@angular/core';
import { FooterContentComponent } from '../footer-content/footer-content.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-content',
  imports: [FooterContentComponent, RouterLink],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css',
})
export class MainContentComponent {

}
