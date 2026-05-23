import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'signUp-form',
  imports: [MatIconModule, NgxMaskDirective, NgxMaskPipe, FormsModule],
  standalone: true,
  templateUrl: './signUp-form.html'
})
export class SignUpForm {

  cpf : string = '';
  nome : string = '';
  email : string = '';
  telefone : string = '';

  getData(): any{
    return {
    cpf: this.cpf,
    nome: this.nome,
    email: this.email,
    telefone: this.telefone
  };
  }
}
