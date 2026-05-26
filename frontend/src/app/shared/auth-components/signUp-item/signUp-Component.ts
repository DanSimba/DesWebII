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

    if (!userData || !enderecoData) {
      alert('Existem informações faltando, por favor atenção ao formulario');
      return;
    }

    const dados = {
      cpf: userData.cpf,
      nome: userData.nome,
      email: userData.email,
      telefone: userData.telefone,

      endereco: {
        cep: enderecoData.cep,
        logradouro: enderecoData.logradouro,
        numero: enderecoData.numero,
        bairro: enderecoData.bairro,
        cidade: enderecoData.cidade,
        estado: enderecoData.uf,
        complemento: enderecoData.complemento,
      },

      sols: [],
    };

    console.log(dados);

    this.executeCadastro(dados);
  }

  executeCadastro(dados: any) {
    this.authService.cadastrar(dados).subscribe({
      next: (response) => {
        console.log(response.status);

        if (response.status === 201) {
          alert('Usuário cadastrado com sucesso');
        }
      },

      error: (erro) => {
        console.log(erro.status);

        if (erro.status === 400) {
          alert('Dados inválidos');
        }

        if (erro.status === 409) {
          alert('Usuário já existe');
        }

        if (erro.status === 500) {
          alert('Erro interno do servidor');
        }
      },
    });
  }

  ngAfterViewInit(): void {}
}
