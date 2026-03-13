import { Component } from '@angular/core';
import { NavBarClient } from '../../shared/components/nav-bar-client/nav-bar-client';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-client',
  imports: [NavBarClient, RouterOutlet],
  standalone: true,
  templateUrl: './client.html',
  styleUrl: './client.css',
})
export class Client {

}
