import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CepServiceService } from '../../../../services/CEP/cep-service.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { CepType } from './cepType'


@Component({
  selector: 'cep-form',
  imports: [MatIconModule, NgxMaskDirective, NgxMaskPipe],
  standalone: true,
  templateUrl: './cep-form.html',
})
export class CepForm implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  private cepService = inject(CepServiceService);

  cepInfo: CepType ={
    logradouro: "",
    uf: "",
    bairro: "",
    complemento: ""
  };

  cepAlteration(cep: string) {
    cep = cep.replace(/-/g, '');

    this.cepService.getCep(cep).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (res) => {
        console.log("+ ERRO NO VIA CEP +"+res);
      }
    });


    /* 
    get logradouro(){
      return this.cepInfo.logradouro;
    }*/
  }
}
