import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { LoginForm } from '../forms/loginForm/login-form';

@Component({
  selector: 'app-loginComponent',
  imports: [MatIconModule, LoginForm],
  standalone: true,
  templateUrl: './login-Component.html'
})
export class LoginComponent {

}
