import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { LoginForm } from '../forms/loginForm/login-form';
import { ViewChild, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-loginComponent',
  imports: [MatIconModule, RouterLink, LoginForm],
  standalone: true,
  templateUrl: './login-component.html'
})
export class LoginComponent implements AfterViewInit {
  @ViewChild(LoginForm) loginForm! : LoginForm;
  constructor(){}

  botaoPai():void{
    this.loginForm.testeMaluco();
  }

  ngAfterViewInit(): void {
    
  }

}
