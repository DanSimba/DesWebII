import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/usr-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private jsonUrl = 'assets/auth-ex.json';

  query(): Observable<User[]> {
    return this.http.get<User[]>(this.jsonUrl);
  }

  loginValidation(email: string, password: string, res: User[]): string | undefined {
    let type;
    res.map((reg) => {
      if (reg.email === email && reg.password === password) {
        type = reg.type;
      }
    });
    console.log(type);
    return type;
  }
}
