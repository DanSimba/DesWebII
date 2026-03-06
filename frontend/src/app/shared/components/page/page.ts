import { Component } from '@angular/core';
import { NavBar } from '../nav-bar/nav-bar'; 
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-page',
  imports: [NavBar, RouterOutlet],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page {

}
