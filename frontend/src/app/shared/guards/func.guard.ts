import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

export const funcGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if(authService.isAuth('FUNCIONARIO'))return true;

  alert("OPSS! Parece que você esqueceu de autenticar! ;)")
  router.navigate(['auth/login']);
  return false;
};
