import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/usr-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly apiURL = 'http://localhost:8080/auth';

  login(email: string, senha: string) : Observable<{token: string}>{
    return this.http.post<{token: string}>(`${this.apiURL}/login`, { email, senha });
  }

  // aqui para auto cadastro
  cadastrar(dados : any) : Observable<any>{
    return this.http.post(`${this.apiURL}/cadastro`, { dados });
  }

  salvarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.removeItem('token');
  }


  // query(): Observable<User[]> {
  //   return this.http.get<User[]>(this.jsonUrl);
  // }

  // loginValidation(email: string, password: string, res: User[]): string | undefined {
  //   let type;
  //   res.map((reg) => {
  //     if (reg.email === email && reg.password === password) {
  //       type = reg.type;
  //     }
  //   });
  //   console.log(type);
  //   return type;
  // }
}
