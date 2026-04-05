import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CepServiceService } from '../../../../services/CEP/cep-service.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { CepType } from './cepType';

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
  private cdr = inject(ChangeDetectorRef);

  cepInfo: CepType = {
    logradouro: '',
    uf: '',
    bairro: '',
    complemento: '',
  };

  cepAlteration(cep: string) {
    //impede de gerar requisições falhas
    if (cep == '' || cep.length < 9) {
      console.log("===IMPEDIDO===");
      return;
    }

    //Retira os caracteres da mascara
    cep = cep.replace(/-/g, '');
    let cepResponse: any;

    //Iludindo o usuario
    this.cepInfo.logradouro = "Buscando...";
    this.cepInfo.uf = "...";
    this.cepInfo.bairro = "Buscando...";
    this.cepInfo.complemento = "Buscando...";

    //Retira os caracteres da mascara
    this.cepService.getCep(cep).subscribe({
      next: (res) => {
        cepResponse = res;
        this.cepInfo.logradouro = cepResponse.logradouro;
        this.cepInfo.uf = cepResponse.uf;
        this.cepInfo.bairro = cepResponse.bairro;
        this.cepInfo.complemento = cepResponse.complemento;
        this.cdr.markForCheck();
      },
      error: (res) => {
        console.log('+ ERRO NO VIA CEP +' + res);
      }
    });
  }
}
