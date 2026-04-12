import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form', 
  standalone: true,
  imports: [MatIconModule, FormsModule],
  templateUrl: './login-form.html',
})
export class LoginForm {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';

  handleLogin(): void {
    if (this.email.trim() && this.password.trim()) {
      this.executeLogin();
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  private executeLogin() {
    this.authService.query().subscribe({
      next: (res) => {
        const userRole = this.authService.loginValidation(
          this.email,
          this.password,
          res
        );

        this.redirectUser(userRole);
      },
      error: (err) => console.error('Login error:', err)
    });
  }

  private redirectUser(role: string | void) {
    const routes: Record<string, string> = {
      'cliente': '/client/panel',
      'funcionario': '/func/panel'
    };

    const targetRoute = routes[role as string];

    if (targetRoute) {
      this.router.navigate([targetRoute]);
    } else {
      alert('Login ou senha incorretos.');
    }
  }
}