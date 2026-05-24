import { Component, inject } from '@angular/core';
import { NavItem } from '../nav-item/nav-item';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-nav-bar-client',
  imports: [NavItem, MatIconModule, MatSidenavModule, MatButtonModule],
  templateUrl: './nav-bar-client.html',
  styleUrl: './nav-bar-client.css',
})
export class NavBarClient {
  private authService = inject(AuthService);
  private router = inject(Router);

  logout(){
    console.log("saiuuuu");
    this.authService.logout();
    this.router.navigate([""]);
  }

}
