import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-loginComponent',
  imports: [MatIconModule, RouterLink],
  standalone: true,
  templateUrl: './login-component.html'
})
export class LoginComponent {

}
