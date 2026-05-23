import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CepForm } from '../forms/cepForm/cep-form';
import { SignUpForm } from '../forms/signUpForm/signUp-form';
import { RouterLink } from '@angular/router';
import { ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-signUpComponent',
  imports: [MatIconModule, CepForm, SignUpForm, RouterLink],
  standalone: true,
  templateUrl: './signUp-Component.html',
})
export class SignUpComponent implements AfterViewInit {
  private authService = inject(AuthService);
  @ViewChild(SignUpForm) signUpForm!: SignUpForm;
  @ViewChild(CepForm) cepForm!: CepForm;
  constructor() {}

  cadastrarBtn(): void {
    let userData = this.signUpForm.getData();
    let enderecoData = this.cepForm.getData();

    const dados = {
      cpf: userData.cpf,
      nome: userData.nome,
      email: userData.email,
      telefone: userData.telefone,

      endereco: {
        cep: enderecoData.cep,
        logradouro: enderecoData.logradouro,
        numero: enderecoData.numero,
        complemento: enderecoData.complemento,
        bairro: enderecoData.bairro,
        cidade: enderecoData.cidade,
        estado: enderecoData.estado,
      },

      sols: [],
    };

    console.log(dados);

    this.executeCadastro(dados);

    alert('cadastrado senha 1234 enviada por email');
  }

  executeCadastro(dados: any) {
  this.authService.cadastrar(dados).subscribe({
    next: (res) => {
      console.log("Cadastro realizado", res);
    },

    error: (err) => {
      console.error("Erro ao cadastrar", err);
    }
  });
}

  ngAfterViewInit(): void {}
}
