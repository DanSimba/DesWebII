import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CepType } from '../../../services/CEP/cep.type';
import { CepService } from '../../../services/CEP/cep.service';
import { CepModel } from './cepModel';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signUpComponent',
  imports: [MatIconModule, ReactiveFormsModule, CommonModule, RouterLink],
  standalone: true,
  templateUrl: './signUp-Component.html',
})
export class SignUpComponent implements OnInit {
  formCep: FormGroup;
  submittedCepForm: any;
  cepResponse: CepType = {
    CEP: '',
    Logradouro: '',
    UF: '',
    Bairro: '',
    Complemento: '',
  };

  constructor(private readonly cepService: CepService, private formBuilder: FormBuilder) {
    this.formCep = this.formBuilder.group({
      cep: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.createFormCep(new CepModel());
  }

  createFormCep(cepModel: CepModel){
    this.formCep = this.formBuilder.group({
      cep: [cepModel.cep]
    });
  }

  onSubmitCepForm(){
    this.submittedCepForm = this.formCep.value;
    let cep = this.submittedCepForm.cep;
    cep = cep.replace(/\D/g, '');
    try {
      this.cepService.getCep(cep).subscribe((response)=>{
        this.cepResponse = response; 
      })
    } catch (error) {
      
    }
  }
}
