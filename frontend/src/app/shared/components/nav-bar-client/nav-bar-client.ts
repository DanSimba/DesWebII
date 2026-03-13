import { Component } from '@angular/core';
import { NavItem } from '../nav-item/nav-item';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nav-bar-client',
  imports: [NavItem, MatIconModule, MatSidenavModule,MatButtonModule],
  templateUrl: './nav-bar-client.html',
  styleUrl: './nav-bar-client.css',
})
export class NavBarClient {

}
