import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
 
  private http = inject(HttpClient);
  private readonly apiURL = 'http://localhost:8080/auth';

  private token = 'token';

  login(email: string, senha: string): Observable<any>{
    //console.log(email);
    return this.http.post<{token: string}>(`${this.apiURL}/login`, { email, password : senha  })
      .pipe(
            map(response => {
              //console.log(response);
              this.salvarToken(response.token);
              return response.token;
            })
          )
  }

  // aqui para auto cadastro
  cadastrar(dados: any): Observable<any> {
  return this.http.post(
    `${this.apiURL}/cadastro`,
    dados,
    { observe: 'response' }
  );
}

  salvarToken(token: string): void {
    localStorage.removeItem('token');
    localStorage.setItem(this.token, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.token);
  }

  isAuth(p: string): boolean {
    const t = this.getToken();
    //console.log("TOKEN: "+ t);
    if(!t)return false;

    const decoded: any = jwtDecode(t); //n sei se vai dar certo mas here we go
    const now = Date.now()/1000;

    if(decoded.perfil===p && decoded.exp>now) return true; //verifica se é cliente/func entrando na rota certa
    
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getTypeUser(): string | null {
    const t = this.getToken();
    if (!t) return null;
  
    const decoded: any = jwtDecode(t);
    if (decoded.perfil) {
      return decoded.perfil;
    } else {
      return null;
    }
  }

  // query(): Observable<User[]> {
  //   return this.http.get<User[]>(this.jsonUrl);
  // }

  //loginValidation(email: string, password: string, res: User[]): string | undefined {
  //  let type;
  //  res.map((reg) => {
  //    if (reg.email === email && reg.senha === password) {
  //      type = reg.perfil;
  //    }
  //  });
  //  console.log(type);
  //  return type;
  //}
}
