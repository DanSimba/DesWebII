import { inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { CanActivateChildFn, Router } from '@angular/router';

export const funcGuard: CanActivateChildFn  = () => {
  const authService = inject(AuthService);
  //console.log("GUARD EXECUTOU");
  const router = inject(Router);
  if(authService.isAuth('FUNCIONARIO'))return true;

  alert("OOPS! Parece que você esqueceu de autenticar ou tentou entrar onde não é autorizado! ;)");
  router.navigate(['auth/login']);
  return false;
};
