import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, RouterLink, MatIconModule],
  standalone: true,
  templateUrl: './auth.html'
})
export class Auth {
  constructor(public router: Router) {}
}
