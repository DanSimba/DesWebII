import { Component, inject } from '@angular/core';
import { NavItem } from '../nav-item/nav-item';

import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-nav-bar-func',
  standalone: true,
  imports: [NavItem],
  templateUrl: './nav-bar-func.html',
  styleUrl: './nav-bar-func.css',
})
export class NavBarFunc {
  private authService = inject(AuthService);
  private router = inject(Router);

  logout(){
    //console.log("saiuuuu");
    this.authService.logout();
    this.router.navigate([""]);
  }

}
