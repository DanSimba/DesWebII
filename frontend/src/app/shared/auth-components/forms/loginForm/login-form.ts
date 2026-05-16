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
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        const role = this.authService.getTypeUser();
        if (role) {
          this.redirectUser(role);
        } else {
          this.redirectUser();
        }
        },
      error: (err) => console.error('Login error:', err)
    });
  }

  private redirectUser(role: string | void) {
    const routes: Record<string, string> = {
      'CLIENTE': '/client/panel',
      'FUNCIONARIO': '/func/panel'
    };

    const targetRoute = routes[role as string];

    if (targetRoute) {
      this.router.navigate([targetRoute]);
    } else {
      alert('Login ou senha incorretos.');
    }
  }
}